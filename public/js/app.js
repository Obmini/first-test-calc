(function(){
}


function chooseOperator(op){
if(operator && !overwrite){ compute(); }
operator = op;
previous = current;
overwrite = true;
}


function compute(){
if(!operator || previous === '') return;
const a = parseFloat(previous);
const b = parseFloat(current);
if(Number.isNaN(a) || Number.isNaN(b)) return;
let result = 0;
switch(operator){
case '+': result = a + b; break;
case '-': result = a - b; break;
case '*': result = a * b; break;
case '/': result = b === 0 ? 'Error' : a / b; break;
}
current = (result === 'Error') ? 'Error' : String(roundAcc(result));
previous = '';
operator = null;
overwrite = true;
}


function roundAcc(num){
// уникнути довгих дробових частин
return Math.round((num + Number.EPSILON) * 1e10) / 1e10;
}


function clearAll(){ current = '0'; previous = ''; operator = null; overwrite=false }


function toggleSign(){
if(current === '0') return;
if(current.startsWith('-')) current = current.slice(1); else current = '-' + current;
}


function percent(){
const val = parseFloat(current);
if(Number.isNaN(val)) return;
current = String(roundAcc(val / 100));
overwrite = true;
}


keys.addEventListener('click', e => {
const t = e.target;
if(t.matches('.num')){
inputNumber(t.dataset.num);
updateDisplay();
}
if(t.matches('.operator')){
chooseOperator(t.dataset.action);
updateDisplay();
}


if(t.dataset.action){
const act = t.dataset.action;
if(act === 'clear') { clearAll(); updateDisplay(); }
if(act === 'toggle-sign') { toggleSign(); updateDisplay(); }
if(act === 'percent') { percent(); updateDisplay(); }
if(act === '=') { compute(); updateDisplay(); }
if(['/','*','-','+'].includes(act)) { /* handled above */ }
}
});


// keyboard support
window.addEventListener('keydown', e => {
if((e.key >= '0' && e.key <= '9') || e.key === '.'){
inputNumber(e.key);
updateDisplay();
}
if(e.key === 'Enter' || e.key === '='){ compute(); updateDisplay(); }
if(e.key === 'Backspace'){ current = current.length > 1 ? current.slice(0,-1) : '0'; updateDisplay(); }
if(e.key === 'Escape'){ clearAll(); updateDisplay(); }
if(['+','-','*','/'].includes(e.key)){ chooseOperator(e.key); updateDisplay(); }
if(e.key === '%'){ percent(); updateDisplay(); }
});


// init
updateDisplay();
})();
