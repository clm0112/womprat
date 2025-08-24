// Typing sound effect
const soundTyping = new Audio('assets/sounds/typing.mp3');
soundTyping.loop = true;
// --- SWTOR Sound Effects ---
const soundSuccess = new Audio('assets/sounds/success.mp3');
const soundFailure = new Audio('assets/sounds/failure.mp3');
const soundHint = new Audio('assets/sounds/hint.mp3');
const soundNext = new Audio('assets/sounds/next.mp3');

function playSound(type) {
  let sound;
  if (type === 'success') sound = soundSuccess;
  else if (type === 'failure') sound = soundFailure;
  else if (type === 'hint') sound = soundHint;
  else if (type === 'next') sound = soundNext;
  else if (type === 'typing') sound = soundTyping;
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

function startTypingSound() {
  soundTyping.currentTime = 0;
  soundTyping.play();
}

function stopTypingSound() {
  soundTyping.pause();
  soundTyping.currentTime = 0;
}
const SALT = "revanchist-2025";
// Each challenge should have a 'hint' (string) or 'hints' (array of strings) property for the bulb to work.
const challengeData = [
  { title: "Korriban Trials: Credits Under 1000", prompt: "An initiate’s ledger lists all positive credits below 1000. Sum all values divisible by 3 or 5. Output the total.", answerHash: "bc8d32bf97fc486f25233def8fd8417230862ff6ea6247d63659dd12e99ed78e", hint: "Multiples-of-3-or-5 classic." },
  { title: "Dromund Kaas: Even Holorelays", prompt: "Fibonacci sequence starting 1,2. Sum even-valued terms not exceeding 4,000,000. Output the total.", answerHash: "f4379a0320439d8fe76ee0bcffab5127c97de69ae9bd1e98d83c3fbb9e991a35", hint: "Only every 3rd Fibonacci term is even." },
  { title: "Tython Cipher: Prime Factor of the Holocron", prompt: "Holocron ID is 600851475143. Compute its largest prime factor. Output the factor.", answerHash: "214a239c3d65678af035639611bd900c36120578d981889f3c99b6026ba0b1a5", hint: "Trial-divide out small primes (2) then odd factors." },
  { title: "Nar Shaddaa Vault: Mirror-ID", prompt: "Find the largest palindrome made from the product of two 3-digit IDs. Output the palindrome.", answerHash: "8ab340bacf0b66fea694ff22f3929dbba63ba16e1743b1faf1e52c3e3fab5694", hint: "Search downward from 999×999; prune when product falls below best." },
  { title: "Imperial Logistics: Perfect Shipment Cycle", prompt: "Find the smallest positive number evenly divisible by every integer from 1 to 20. Output that number.", answerHash: "d22d201bc1a16a23ffc115515c261c0397efe2e947aeb671d5fa6faefcb94317", hint: "Compute LCM of 1..20." },
  { title: "Alderaan Academy: Squares in the Archives", prompt: "For n=100: (sum of 1..100)^2 − (sum of squares of 1..100). Output the result.", answerHash: "23bc5551fa37a0d9f5e2e432fbe7ff5b3eafb8764807f3ff5b188a29e0082f52", hint: "Use formulas: sum = n(n+1)/2; sum of squares = n(n+1)(2n+1)/6." },
  { title: "Core Worlds: The 10001st Holonet Prime", prompt: "Find the 10001st prime number. Output the prime.", answerHash: "9c7ec8f33c437047fd50da126108adb3404626df30d3990a4e6a003235af866e", hint: "Sieve or incremental primality test until you count 10001 primes." },
  { title: "Bounty Board: Longest Chain on Coruscant", prompt: "Among starting numbers under 1,000,000, which produces the longest Collatz chain? Output the starting number.", answerHash: "82318b81ed5d9e5282de392e94a8dcb663d63bf3dce456804e866498f6d89e23", hint: "Use memoization to cache chain lengths." },
  { title: "Kuat Drive Yards: 20×20 Lattice", prompt: "Count routes from top-left to bottom-right in a 20×20 grid moving only right or down. Output the count.", answerHash: "612c11398cbfec6de53b6af7b640cfb5f8c875fef6dc94a79185af4ec76dd259", hint: "Central binomial coefficient: C(40, 20)." },
  { title: "Czerka Slicing: Sum the Primes", prompt: "Sum all primes below 2,000,000. Output the total.", answerHash: "548d73b0c31b9568c7f295f5949544ae6c38a3ad97d53a98976a7d4cdba5694d", hint: "Sieve of Eratosthenes then sum." },
  { title: "Holocron Heatsink: Over 500 Artifacts", prompt: "Find the first triangular number with more than 500 divisors. Output the number.", answerHash: "a2a8024a184571f20d0b17ae166275f7e3b71062541fadfe380ac288bbdafbb1", hint: "T_k = k(k+1)/2; factorize to count divisors using exponent product." },
  { title: "Force Lightning: Power Surge", prompt: "Compute the sum of digits of 2^1000. Output the sum.", answerHash: "fc28a0cef3ef90c495cb3f1c9d86a4931a25f281091f4a6f386900aace9ab39b", hint: "Use big integer / string power." },
  { title: "Jedi Archives: 1000-Digit Threshold", prompt: "Find the index of the first Fibonacci number with 1000 digits. Output the index.", answerHash: "1e24fb6896854908d32f123578f308ffa8a512c1e193242e70716128f80e4671", hint: "Iterate with big integers until digits == 1000." },
  { title: "CZ-198: Distinct Power Signatures", prompt: "For 2 ≤ a ≤ 100 and 2 ≤ b ≤ 100, how many distinct values of a^b exist? Output the count.", answerHash: "951500ffa085d13fdaf35dbdd5732dec7676e51f7a6bc2d45b2c64e8152de083", hint: "Store a^b in a Set (string form)." },
  { title: "The Infinite Empire: Lexicoder", prompt: "Lexicographic permutations of digits 0..9. Output the millionth permutation as a 10-digit string.", answerHash: "fe53cb181031ff1295e311827bc24de3ae519a77d5d528732ca7ae64d679c475", hint: "Use factorial number system to index permutations." },
  { title: "Dantooine Relay: Factorial Capacitor", prompt: "Compute the sum of digits of 100!. Output the sum.", answerHash: "1b8058021b9aff2e144cfb53c4c4a6a3fe17cbf9d22ea0f2aa5ccf9eb121fd8e", hint: "Compute 100! using big integers." },
  { title: "Coruscant Spire: Diagonal Primes", prompt: "Number spiral diagonals: at what side length does the ratio of primes along the diagonals first drop below 10%? Output the side length.", answerHash: "1dfaa64a64ed01d8b90d9ddfa1de6334158739c30378019a0aed272c1d194bab", hint: "Corner values per layer k: n^2, n^2 - (n-1), n^2 - 2(n-1), n^2 - 3(n-1)." },
  { title: "Ilum Forge: Quadratic Focus", prompt: "For n^2 + a n + b, |a|<1000, |b|≤1000, find the product a*b that maximizes consecutive primes for n starting at 0. Output a*b.", answerHash: "16fb68fa1b47699de7676adb509470b2f852055f73dbccac70e8135632a9a8a3", hint: "b must be prime (since n=0 ⇒ b must be prime)." },
  { title: "Republic Treasury: Non-Abundant Sums", prompt: "Sum all positive integers ≤ 28123 that cannot be written as the sum of two abundant numbers. Output the sum.", answerHash: "0a23b3e09e0845ee6ffc441635488b706645e4fb8f22b62e2817ecbc1833415c", hint: "Generate all abundant numbers ≤ 28123." },
  { title: "Tatooine Mirage: Permuted Multiples", prompt: "Find the smallest positive integer x such that 2x..6x contain the same digits as x. Output x.", answerHash: "3f44c6717ccd579e7b559f6866a2fe598c1d6686f54cdbcee920b87c14d22159", hint: "Compare digit counts of x and kx for k=2..6." }
];

// --- SHA-256 Hash Function ---
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function normalize(input) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// --- Prompts ---
const puzzlePrompts = {};
for (let i = 0; i < challengeData.length; i++) {
  puzzlePrompts[i+1] = `🧩 ${challengeData[i].title}\n${challengeData[i].prompt}`;
}

// --- Validators ---
const validators = {};
for (let i = 0; i < challengeData.length; i++) {
  const answerHash = challengeData[i].answerHash;
  validators[i+1] = async (output) => {
    const normalized = normalize(output);
    const hash = await sha256(`${SALT}|${normalized}`);
    return hash === answerHash;
  };
}


// --- Singular Terminal Flow ---
let currentQuestion = 1;
const totalQuestions = challengeData.length;
const terminalScroll = document.getElementById('terminal-scroll');
const terminalInput = document.getElementById('terminal-input');
let wrongTries = 0;
let shownHintIndex = -1;

// ...existing code...

function addTerminalLine(text, type = '') {
  const line = document.createElement('div');
  line.className = 'terminal-output' + (type ? ' ' + type : '');
  let icon = '';
  if (type === 'success') {
    icon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:8px;">
      <circle cx="11" cy="11" r="10" fill="#00bfff" stroke="#ffe066" stroke-width="2"/>
      <path d="M6 12l3 3 6-6" stroke="#ffe066" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    let msg = text.replace('✅ Correct Output', '').trim();
    text = msg ? `Mission Success: ${msg}` : 'Mission Success';
    playSound('success');
  } else if (type === 'error') {
    icon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:8px;">
      <circle cx="11" cy="11" r="10" fill="#00bfff" stroke="#ffe066" stroke-width="2"/>
      <path d="M7 7l8 8M15 7l-8 8" stroke="#ffe066" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`;
    let msg = text.replace('❌ Incorrect Output:', '').trim();
    text = msg ? `Mission Failure: ${msg}` : 'Mission Failure';
    playSound('failure');
  } else if (type === 'warning') {
    icon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:8px;"><circle cx="11" cy="11" r="10" fill="#ffe066" stroke="#00bfff" stroke-width="2"/><path d="M11 7v5M11 15v1" stroke="#181c24" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
    let msg = text.replace('💡 Hint:', '').replace(/<[^>]+>/g, '').trim();
    text = msg ? `Hint Unlocked: ${msg}` : 'Hint Unlocked';
    playSound('hint');
  } else if (type === 'typing') {
    icon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:8px;"><circle cx="11" cy="11" r="10" fill="#00bfff" stroke="#ffe066" stroke-width="2"/><text x="11" y="16" text-anchor="middle" font-size="14" fill="#181c24" font-family="Eurostar, Orbitron">?</text></svg>`;
  }
  line.innerHTML = icon + escapeHtml(text);
  terminalScroll.appendChild(line);
  terminalScroll.scrollTop = terminalScroll.scrollHeight;
}

function showPrompt(num) {
  let prompt = puzzlePrompts[num] || "No prompt available.";
  // Remove leading puzzle emoji if present
  if (prompt.startsWith('🧩 ')) {
    prompt = prompt.slice(2);
  }
  terminalInput.textContent = '';
  terminalInput.setAttribute('contenteditable', 'false');
  wrongTries = 0;
  shownHintIndex = -1;
  // Typing animation with SWTOR question mark icon
  let i = 0;
  startTypingSound();
  function typeNext() {
    if (i <= prompt.length) {
      let line = document.querySelector('.terminal-output.typing');
      if (!line) {
        line = document.createElement('div');
        line.className = 'terminal-output typing';
        terminalScroll.appendChild(line);
      }
      line.innerHTML = `<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" style=\"vertical-align:middle;margin-right:8px;\"><circle cx=\"11\" cy=\"11\" r=\"10\" fill=\"#00bfff\" stroke=\"#ffe066\" stroke-width=\"2\"/><text x=\"11\" y=\"16\" text-anchor=\"middle\" font-size=\"16\" fill=\"#ffe066\" font-family=\"Eurostar, Orbitron\">?</text></svg>` + escapeHtml(prompt.slice(0, i));
      terminalScroll.scrollTop = terminalScroll.scrollHeight;
      i++;
      setTimeout(typeNext, 18 + Math.random()*40);
    } else {
      stopTypingSound();
      let line = document.querySelector('.terminal-output.typing');
      if (line) line.classList.remove('typing');
      terminalInput.setAttribute('contenteditable', 'true');
      terminalInput.focus();
    }
  }
  typeNext();
}

async function handleRunPuzzle() {
  let parsedInput = terminalInput.textContent.trim();
  if (!parsedInput) return;
  addTerminalLine('> ' + parsedInput, '');
  terminalInput.textContent = '';
  terminalInput.setAttribute('contenteditable', 'false');
  const output = parsedInput;
  try {
    const isValid = await validators[currentQuestion](output);
    if (isValid) {
      addTerminalLine('✅ Correct Output', 'success');
      currentQuestion++;
      if (currentQuestion > totalQuestions) {
        addTerminalLine('🎉 All puzzles complete!', 'success');
        terminalInput.setAttribute('contenteditable', 'false');
        return;
      }
      // After every 4 questions, show next screen arrow
      if ((currentQuestion - 1) % 4 === 0 && currentQuestion <= totalQuestions) {
        setTimeout(() => {
          // Remove any existing arrow first
          const oldArrow = terminalScroll.querySelector('.next-arrow');
          if (oldArrow) oldArrow.remove();
          const nextArrow = document.createElement('button');
          nextArrow.className = 'next-arrow';
          nextArrow.innerHTML = '&gt;';
          nextArrow.title = 'Next Screen';
          nextArrow.style.display = 'inline-block';
          // Hide input area until next page appears
          const inputRow = document.querySelector('.swtor-input-row');
          if (inputRow) inputRow.style.display = 'none';
          nextArrow.onclick = () => {
            playSound('next');
            terminalScroll.innerHTML = '';
            showPrompt(currentQuestion);
            // Show input area again after next page appears
            setTimeout(() => {
              if (inputRow) inputRow.style.display = '';
            }, 100);
          };
          terminalScroll.appendChild(nextArrow);
          terminalScroll.scrollTop = terminalScroll.scrollHeight;
        }, 400);
      } else {
        // Add spacing and fade-in animation before next question
        setTimeout(() => {
          const spacer = document.createElement('div');
          spacer.className = 'terminal-spacer';
          terminalScroll.appendChild(spacer);
          terminalScroll.scrollTop = terminalScroll.scrollHeight;
          setTimeout(() => {
            showPrompt(currentQuestion);
            // Fade-in effect for next question prompt
            let lastLine = terminalScroll.querySelector('.terminal-output.typing');
            if (lastLine) {
              lastLine.classList.add('fade-in');
              setTimeout(() => lastLine.classList.remove('fade-in'), 600);
            }
          }, 400);
        }, 400);
      }
    } else {
      wrongTries++;
      let hints = [];
      if (Array.isArray(challengeData[currentQuestion-1].hints) && challengeData[currentQuestion-1].hints.length) {
        hints = challengeData[currentQuestion-1].hints;
      } else if (challengeData[currentQuestion-1].hint) {
        hints = [challengeData[currentQuestion-1].hint];
      }
      if (wrongTries === 2 && hints.length > 0) {
        playSound('hint');
        shownHintIndex++;
        if (shownHintIndex < hints.length) {
          addTerminalLine('💡 Hint: ' + hints[shownHintIndex], 'warning');
        }
      } else {
        playSound('failure');
        addTerminalLine('❌ Incorrect Output: ' + output, 'error');
        // Show hint if more hints are available after 2nd wrong, but do NOT play hint sound
        if (wrongTries > 2 && hints.length > 0) {
          let nextHintIndex = shownHintIndex + 1;
          if (nextHintIndex < hints.length) {
            shownHintIndex = nextHintIndex;
            addTerminalLine('💡 Hint: ' + hints[shownHintIndex], 'warning');
          }
        }
      }
      terminalInput.setAttribute('contenteditable', 'true');
      terminalInput.focus();
    }
  } catch (err) {
    addTerminalLine('❌ Error running puzzle: ' + err.message, 'error');
    terminalInput.setAttribute('contenteditable', 'true');
    terminalInput.focus();
  }
}

terminalInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleRunPuzzle();
  }
});

showPrompt(currentQuestion);