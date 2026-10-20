/**
 * ====================================================================
 * WEBSITE KỶ NIỆM 20/10 - NGÀY PHỤ NỮ VIỆT NAM
 * Interactive Engine: Canvas Petals, Audio Synthesizer,
 * Card Generator, Bouquet Builder, Fortune Cards
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================================================================
  // 1. SOUND EFFECTS & ROMANTIC AMBIENT SYNTHESIZER (WEB AUDIO API)
  // ==================================================================
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicTimer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a soft romantic chime sound effect
  function playChime(freq = 587.33, duration = 0.8) {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio not allowed yet:', e);
    }
  }

  // Soft sparkle harp sound
  function playSparkleSound() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => playChime(freq, 0.6), idx * 75);
    });
  }

  // Romantic ambient music melody loop (calm lofi piano notes)
  const melodyNotes = [
    261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 587.33, 493.88,
    349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 392.00, 329.63
  ];
  let noteIndex = 0;

  function playMelodyStep() {
    if (!isMusicPlaying || !audioCtx) return;
    try {
      const freq = melodyNotes[noteIndex % melodyNotes.length];
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);

      noteIndex++;
    } catch (e) {
      console.error(e);
    }
  }

  const musicBtn = document.getElementById('btn-music-toggle');
  const musicWave = document.getElementById('music-wave');
  const musicText = document.getElementById('music-text');

  musicBtn.addEventListener('click', () => {
    initAudio();
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      musicWave.classList.remove('paused');
      musicBtn.classList.add('active');
      musicText.textContent = 'Đang Phát Nhạc';
      playSparkleSound();
      showToast('🎵 Đang phát giai điệu piano lãng mạn nhẹ nhàng');
      playMelodyStep();
      musicTimer = setInterval(playMelodyStep, 750);
    } else {
      musicWave.classList.add('paused');
      musicBtn.classList.remove('active');
      musicText.textContent = 'Bật Nhạc';
      clearInterval(musicTimer);
      showToast('🔇 Đã tắt nhạc nền');
    }
  });

  // ==================================================================
  // 2. CANVAS FLOATING ROSE PETALS & SPARKLES
  // ==================================================================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const PETAL_COUNT = 38;

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03 + 0.01;
      this.opacity = Math.random() * 0.65 + 0.35;
      this.color = Math.random() > 0.35 
        ? 'rgba(242, 106, 141, ' 
        : (Math.random() > 0.5 ? 'rgba(232, 195, 125, ' : 'rgba(255, 180, 200, ');
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 1.1 + this.speedX;
      this.angle += this.rotationSpeed;
      this.flip += this.flipSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(1, Math.sin(this.flip));

      // Draw rose petal teardrop path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);

      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.fill();

      // Delicate petal vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + (this.opacity * 0.35) + ')';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.size * 0.7);
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  // Sparkling background stars
  const sparkles = Array.from({ length: 28 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.5,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.01
  }));

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw twinkling sparkles
    sparkles.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 223, 158, ${Math.abs(s.alpha) * 0.55})`;
      ctx.fill();
    });

    // Draw floating petals
    petals.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // ==================================================================
  // 3. TOAST NOTIFICATION UTILITY
  // ==================================================================
  const toast = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimer = null;

  function showToast(message, icon = '✨') {
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==================================================================
  // 4. CONFETTI BURST ANIMATION
  // ==================================================================
  function launchConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
    const confettiCount = 50;
    const colors = ['#f26a8d', '#e8c37d', '#ffffff', '#ffd3df', '#a62a4d'];
    const particles = [];

    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5,
        alpha: 1,
        life: 1
      });
    }

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    document.body.appendChild(confettiCanvas);

    const cCtx = confettiCanvas.getContext('2d');

    function renderConfetti() {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25; // gravity
          p.rotation += p.rotSpeed;
          p.life -= 0.018;

          cCtx.save();
          cCtx.translate(p.x, p.y);
          cCtx.rotate((p.rotation * Math.PI) / 180);
          cCtx.fillStyle = p.color;
          cCtx.globalAlpha = Math.max(0, p.life);
          cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          cCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(renderConfetti);
      } else {
        confettiCanvas.remove();
      }
    }
    renderConfetti();
  }

  // ==================================================================
  // 5. SECTION 1: HỘP QUÀ BÍ MẬT & BỨC THƯ YÊU THƯƠNG
  // ==================================================================
  const lettersData = {
    mom: {
      title: 'Kính gửi Mẹ yêu quý của con,',
      body: 'Cảm ơn Mẹ đã luôn là bến đỗ bình yên nhất, hy sinh cả thanh xuân để che chở và nuôi nấng con nên người. Nhân ngày 20/10, con chỉ mong Mẹ luôn dồi dào sức khỏe, an yên và nở nụ cười hạnh phúc mỗi ngày!',
      sign: 'Mãi yêu và biết ơn Mẹ rất nhiều ♥'
    },
    lover: {
      title: 'Gửi người con gái anh yêu nhất,',
      body: 'Em là món quà tuyệt vời nhất mà cuộc sống này đã ban tặng cho anh. Chúc em ngày 20/10 luôn xinh đẹp rạng rỡ, ngập tràn tiếng cười và luôn cảm thấy ấm áp, hạnh phúc khi ở bên anh!',
      sign: 'Yêu em hơn ngàn lời nói ♥'
    },
    sister: {
      title: 'Gửi Chị / Em gái đáng yêu,',
      body: 'Chúc người phụ nữ vừa điệu đà vừa tài giỏi của gia đình có một ngày 20/10 ngập tràn niềm vui, nhận được thật nhiều hoa, nhiều quà và ngày càng thăng hoa trong công việc lẫn cuộc sống nhé!',
      sign: 'Tự hào về chị/em rất nhiều ♥'
    },
    teacher: {
      title: 'Kính gửi Cô giáo kính yêu,',
      body: 'Nhân ngày Phụ nữ Việt Nam 20/10, em xin gửi lời tri ân chân thành nhất tới Cô — người đã tận tâm dìu dắt, thắp sáng ước mơ và trao cho chúng em tri thức vô giá. Kính chúc Cô luôn mạnh khỏe, hạnh phúc!',
      sign: 'Học trò tri ân sâu sắc ♥'
    },
    friend: {
      title: 'Gửi Bạn thân & Nữ đồng nghiệp tuyệt vời,',
      body: 'Chúc bạn một ngày 20/10 thật rực rỡ! Chúc bạn lúc nào cũng vui tươi, rạng ngời, việc nhẹ lương cao, sớm đạt được mọi ước mơ và luôn là phiên bản tự tin, lấp lánh nhất của chính mình!',
      sign: 'Mãi là đồng đội tuyệt vời nhé ♥'
    }
  };

  const recipientTabs = document.querySelectorAll('#recipient-tabs .tab-btn');
  const letterTitle = document.getElementById('letter-recipient-title');
  const letterBody = document.getElementById('letter-body-text');
  const letterSign = document.getElementById('letter-sign-text');
  const letterBox = document.getElementById('letter-content-display');

  recipientTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      recipientTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const type = tab.getAttribute('data-type');
      const data = lettersData[type];

      letterBox.style.opacity = '0';
      letterBox.style.transform = 'translateY(10px)';
      playChime(659.25, 0.4);

      setTimeout(() => {
        letterTitle.textContent = data.title;
        letterBody.textContent = data.body;
        letterSign.textContent = data.sign;
        letterBox.style.transition = 'all 0.35s ease';
        letterBox.style.opacity = '1';
        letterBox.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // Gift Box Modal Unboxing
  const giftBoxFrame = document.getElementById('interactive-gift-box');
  const giftModal = document.getElementById('gift-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCelebrateBtn = document.getElementById('btn-modal-celebrate');

  function openGiftModal(e) {
    playSparkleSound();
    const rect = giftBoxFrame.getBoundingClientRect();
    launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    giftModal.classList.add('active');
  }

  function closeGiftModal() {
    giftModal.classList.remove('active');
  }

  giftBoxFrame.addEventListener('click', openGiftModal);
  document.getElementById('btn-hero-gift').addEventListener('click', (e) => {
    // Smooth scroll to section then trigger after short delay
    setTimeout(() => {
      openGiftModal(e);
    }, 600);
  });

  modalClose.addEventListener('click', closeGiftModal);
  modalCelebrateBtn.addEventListener('click', () => {
    closeGiftModal();
    launchConfetti();
    showToast('🎉 Chúc bạn một ngày 20/10 ngập tràn niềm vui!');
  });

  giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal) closeGiftModal();
  });

  // ==================================================================
  // 6. SECTION 2: TẠO THIỆP CHÚC MỪNG TÙY CHỌN
  // ==================================================================
  const inputRecipient = document.getElementById('input-recipient');
  const inputSender = document.getElementById('input-sender');
  const inputMessage = document.getElementById('input-message');
  const previewTo = document.getElementById('preview-to-text');
  const previewMsg = document.getElementById('preview-msg-text');
  const previewFrom = document.getElementById('preview-from-text');
  const cardPreview = document.getElementById('card-preview-target');
  const themeDots = document.querySelectorAll('.theme-dot');
  const templateBtns = document.querySelectorAll('.btn-mini[data-template]');

  const templates = {
    sweet: 'Chúc em ngày 20/10 ngọt ngào như viên kẹo, rạng rỡ như ánh bình minh và luôn là điều bình yên dịu dàng nhất!',
    respect: 'Nhân ngày 20/10, con/em xin gửi lời tri ân sâu sắc và lòng biết ơn chân thành nhất. Kính chúc người luôn an vui, dồi dào sức khỏe và ngập tràn may mắn!',
    humor: 'Chúc bạn 20/10 tay ôm nhiều quà, miệng cười toe toét, ăn no không béo, ví dày cộm tiền và sớm có người yêu đón rước!',
    success: 'Chúc bạn ngày 20/10 tỏa sáng rực rỡ, ngày càng tự tin, bản lĩnh và gặt hái thêm nhiều thành công vang dội trên con đường đã chọn!'
  };

  // Sync Input to Preview
  function updateCardPreview() {
    previewTo.textContent = `Gửi: ${inputRecipient.value.trim() || 'Người Phụ Nữ Tuyệt Vời'}`;
    previewMsg.textContent = `"${inputMessage.value.trim() || 'Chúc bạn luôn xinh đẹp, hạnh phúc và an lành!'}"`;
    previewFrom.textContent = `Thương gửi từ: ${inputSender.value.trim() || 'Người trân quý bạn'} ♥`;
  }

  inputRecipient.addEventListener('input', updateCardPreview);
  inputSender.addEventListener('input', updateCardPreview);
  inputMessage.addEventListener('input', updateCardPreview);

  // Template Quick Picks
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-template');
      inputMessage.value = templates[type];
      updateCardPreview();
      playChime(783.99, 0.3);
      showToast('Đã chọn mẫu lời chúc gợi ý!');
    });
  });

  // Theme color picking
  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorClass = dot.getAttribute('data-color');

      cardPreview.className = `live-card ${colorClass}`;
      playChime(880, 0.3);
    });
  });

  // Copy Wish Text
  document.getElementById('btn-copy-card').addEventListener('click', () => {
    const textToCopy = `🌸 CHÚC MỪNG 20/10 🌸\n${previewTo.textContent}\n\n${previewMsg.textContent}\n\n${previewFrom.textContent}\n✨ Chúc một ngày Phụ nữ Việt Nam trọn vẹn yêu thương! ✨`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('📋 Đã sao chép lời chúc vào khay nhớ tạm!');
      playSparkleSound();
    }).catch(() => {
      showToast('Không thể tự động sao chép, vui lòng bôi đen để copy!');
    });
  });

  // Download Card as Image (Offscreen Canvas Renderer)
  document.getElementById('btn-download-card').addEventListener('click', () => {
    showToast('🎨 Đang tạo ảnh thiệp độ phân giải cao...');
    playSparkleSound();

    const dCanvas = document.createElement('canvas');
    dCanvas.width = 1200;
    dCanvas.height = 700;
    const dCtx = dCanvas.getContext('2d');

    // Background Gradient based on active theme
    const activeDot = document.querySelector('.theme-dot.active');
    const colorType = activeDot ? activeDot.getAttribute('data-color') : 'theme-rose';

    let grad = dCtx.createLinearGradient(0, 0, 1200, 700);
    if (colorType === 'theme-gold') {
      grad.addColorStop(0, '#38290f');
      grad.addColorStop(1, '#150e03');
    } else if (colorType === 'theme-lavender') {
      grad.addColorStop(0, '#23123c');
      grad.addColorStop(1, '#0d0519');
    } else if (colorType === 'theme-emerald') {
      grad.addColorStop(0, '#0d3023');
      grad.addColorStop(1, '#04140e');
    } else {
      grad.addColorStop(0, '#3c1222');
      grad.addColorStop(1, '#18050e');
    }

    dCtx.fillStyle = grad;
    dCtx.fillRect(0, 0, 1200, 700);

    // Golden Ornate Border
    dCtx.strokeStyle = '#e8c37d';
    dCtx.lineWidth = 4;
    dCtx.strokeRect(40, 40, 1120, 620);
    dCtx.strokeStyle = 'rgba(232, 195, 125, 0.4)';
    dCtx.lineWidth = 1.5;
    dCtx.strokeRect(52, 52, 1096, 596);

    // Header badge
    dCtx.fillStyle = '#e8c37d';
    dCtx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    dCtx.textAlign = 'center';
    dCtx.fillText('✨ KỶ NIỆM NGÀY PHỤ NỮ VIỆT NAM 20 THÁNG 10 ✨', 600, 120);

    // Recipient
    dCtx.fillStyle = '#ffffff';
    dCtx.font = 'bold 44px "Playfair Display", serif';
    dCtx.fillText(previewTo.textContent, 600, 200);

    // Message Text (with word wrap)
    dCtx.fillStyle = '#ffeef3';
    dCtx.font = 'italic 34px "Dancing Script", cursive, serif';

    const words = previewMsg.textContent.split(' ');
    let line = '';
    let y = 300;
    const maxWidth = 980;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = dCtx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        dCtx.fillText(line, 600, y);
        line = words[n] + ' ';
        y += 50;
      } else {
        line = testLine;
      }
    }
    dCtx.fillText(line, 600, y);

    // Sender
    dCtx.fillStyle = '#e8c37d';
    dCtx.font = 'italic 26px "Playfair Display", serif';
    dCtx.fillText(previewFrom.textContent, 600, 580);

    // Trigger download
    const link = document.createElement('a');
    link.download = 'Thiep_Chuc_Mung_20_10.png';
    link.href = dCanvas.toDataURL('image/png');
    link.click();

    launchConfetti();
    showToast('📥 Đã tải ảnh thiệp về máy thành công!');
  });

  // Web Share or Copy Link
  document.getElementById('btn-share-card').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Chúc Mừng Ngày 20/10',
        text: `${previewTo.textContent} - ${previewMsg.textContent}`,
        url: window.location.href
      }).then(() => {
        showToast('🚀 Đã chia sẻ thành công!');
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('🔗 Đã sao chép liên kết trang web!');
      });
    }
  });

  // ==================================================================
  // 7. SECTION 3: VƯỜN HOA TRI ÂN (VIRTUAL BOUQUET BUILDER)
  // ==================================================================
  const flowerCards = document.querySelectorAll('.flower-card');
  const bouquetCollection = document.getElementById('bouquet-collection');
  const emptyTrayText = document.getElementById('empty-tray-text');
  const bouquetCount = document.getElementById('bouquet-count');
  const btnSendBouquet = document.getElementById('btn-send-bouquet');
  const btnClearBouquet = document.getElementById('btn-clear-bouquet');

  let bouquetFlowers = [];

  flowerCards.forEach(card => {
    card.addEventListener('click', () => {
      const emoji = card.getAttribute('data-flower');
      const name = card.getAttribute('data-name');

      bouquetFlowers.push(emoji);

      if (emptyTrayText) {
        emptyTrayText.style.display = 'none';
      }

      const flowerEl = document.createElement('span');
      flowerEl.className = 'collected-flower-item';
      flowerEl.textContent = emoji;
      flowerEl.title = name;
      bouquetCollection.appendChild(flowerEl);

      bouquetCount.textContent = `${bouquetFlowers.length} Bông hoa`;
      playChime(523.25 + bouquetFlowers.length * 30, 0.35);
      showToast(`+1 ${name} đã được thêm vào bó hoa!`, emoji);
    });
  });

  btnClearBouquet.addEventListener('click', () => {
    bouquetFlowers = [];
    bouquetCollection.innerHTML = '';
    const notice = document.createElement('span');
    notice.className = 'empty-tray-notice';
    notice.id = 'empty-tray-text';
    notice.textContent = 'Nhấp vào từng đóa hoa ở trên để thêm vào giỏ hoa trao tặng nhé! ✨';
    bouquetCollection.appendChild(notice);
    bouquetCount.textContent = '0 Bông hoa';
    showToast('Đã làm mới giỏ hoa!');
  });

  btnSendBouquet.addEventListener('click', (e) => {
    if (bouquetFlowers.length === 0) {
      showToast('Hãy chọn ít nhất 1 đóa hoa trước khi gửi nhé! 🌹', '⚠️');
      return;
    }

    const rect = btnSendBouquet.getBoundingClientRect();
    launchConfetti(rect.left + rect.width / 2, rect.top);
    playSparkleSound();
    showToast(`💐 Đã trao gửi thành công ${bouquetFlowers.length} đóa hoa ngát hương cùng ngàn lời chúc!`, '💖');
  });

  // ==================================================================
  // 8. SECTION 4: RÚT QUẺ MAY MẮN (FORTUNE BLOCKS)
  // ==================================================================
  const fortuneCards = document.querySelectorAll('.fortune-card-container');

  fortuneCards.forEach(card => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.contains('flipped');
      card.classList.toggle('flipped');

      if (!isFlipped) {
        playSparkleSound();
        const rect = card.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        showToast('✨ Quẻ may mắn đã được mở! Chúc bạn mọi sự an lành!');
      } else {
        playChime(440, 0.3);
      }
    });
  });

  // Smooth scroll helper for nav buttons
  document.getElementById('btn-quick-wish').addEventListener('click', () => {
    document.getElementById('card-section').scrollIntoView({ behavior: 'smooth' });
  });

});
