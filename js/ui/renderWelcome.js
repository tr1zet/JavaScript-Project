import { saveUserName } from '../core/storage.js';

export function renderWelcome(app, startApp) {
  app.innerHTML = `
    <div class="welcome-wrapper">
      <div class="welcome-box glass">
        <h1>🌍 World Countries Explorer</h1>
        <p class="welcome-desc">Исследуйте страны мира в одном месте</p>
        
        <div class="input-wrapper">
          <input 
            type="text" 
            id="nameInput" 
            class="welcome-input" 
            placeholder="Введите ваше имя"
            autocomplete="off"
          >
        </div>
        
        <button id="startBtn" class="welcome-start-btn">Далее →</button>
      </div>
    </div>
  `;

  
  const style = document.createElement('style');
  style.textContent = `
    .welcome-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: var(--bg);
    }
    
    .welcome-box {
      max-width: 480px;
      width: 100%;
      padding: 50px 40px;
      text-align: center;
      animation: fadeInUp 0.5s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .welcome-box h1 {
      font-size: 32px;
      margin-bottom: 12px;
      color: var(--text);
    }
    
    .welcome-desc {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 40px;
    }
    
    .input-wrapper {
      margin-bottom: 30px;
    }
    
    .welcome-input {
      width: 100%;
      padding: 16px 20px;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text);
      transition: all 0.3s ease;
    }
    
    .welcome-input:focus {
      outline: none;
      border-color: var(--accent);
      background: rgba(255, 255, 255, 0.15);
    }
    
    .welcome-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    .welcome-start-btn {
      width: 100%;
      padding: 16px;
      background: var(--accent);
      border: none;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .welcome-start-btn:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
    }
    
    .welcome-start-btn:active {
      transform: translateY(0);
    }
  `;
  
  document.head.appendChild(style);

  const startBtn = document.getElementById('startBtn');
  const nameInput = document.getElementById('nameInput');

  const handleStart = () => {
    const name = nameInput.value.trim();
    
    if (!name) {
      nameInput.style.borderColor = '#ef4444';
      nameInput.style.animation = 'shake 0.3s ease';
      
      setTimeout(() => {
        nameInput.style.borderColor = 'var(--border)';
        nameInput.style.animation = '';
      }, 500);
      
      const shakeKeyframes = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
      if (!document.querySelector('#shake-style')) {
        const shakeStyle = document.createElement('style');
        shakeStyle.id = 'shake-style';
        shakeStyle.textContent = shakeKeyframes;
        document.head.appendChild(shakeStyle);
      }
      return;
    }
    
    saveUserName(name);
    startApp();
  };

  startBtn.addEventListener('click', handleStart);
  
  nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  });
}
