const phrasesOfenemies = ['тоби пизда!!','за Фашистов!', 'я ебал твою мамку!', 'я таких как ты на завтрак ем!!']
const lastNameEnemy = ['больной', 'тупой','лысый','кривой','блатной','дерзкий','наглый'];
const firstNameEnemy = ['трагладит', 'ивалид','политик','бомж','гопник','алкаш','задрот'];
const randomMove = [1,2]
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}



class Hero {
  constructor(hero) {
    this.name = hero.name,
      this.hp = hero.hp,
      this.dg = hero.dg,
      this.img = '',
      this.fullHp = hero.fullHp

  }
  attack(enemy) {
    enemy.hp -= this.dg;
  }
}

class Imperial extends Hero {
  constructor(hero) {
    super(hero)
    this.name = hero.name,
      this.hp = 150,
      this.dg = 35,
      this.fullHp = 150,
      this.img = './images/imperial.png'

  }
  superAttack(enemy) {
    enemy.hp -= this.dg * 2;
  }
}
class Org extends Hero {
  constructor(hero) {
    super(hero)
    this.hp = 230,
      this.dg = 50,
      this.fullHp = 230,
      this.img = './images/orc.png'

  }
  
}

class Wizzard extends Hero {
  constructor(hero) {
    super(hero)
    this.hp = 120,
      this.dg = 30,
      this.fullHp = 120,
      this.img = './images/wizzard.png'
      
  }
  superAttack(enemy) {
       
    enemy.hp -= this.dg;
    this.hp += this.dg
  }
}



class Enemy {
  constructor(name, hp,dg,img ) {
     this.name = name,
      this.hp = hp,
      this.dg = dg,
      this.img = img
      this.fullHp = 50

  }
  attack(enemy) {
    enemy.hp -= this.dg;
  }
}



class Observable {
  constructor() {
    this.value = undefined;
    this.callbacks = [];
  }
  onChange(callback) {
    this.callbacks.push(callback);
  }
  set(value) {
    this.value = value;
    this.callbacks.forEach(cb => cb(value));
  }
}

const store = {
  player: new Observable(),

};

let enemy = new Enemy(`${getRandomItem(lastNameEnemy)} ${getRandomItem(firstNameEnemy)}`,50, 20,'./images/orc.png')


const selectPerson = () => {

  let player

  document.querySelectorAll('.person-item__img').forEach((person) => {
    person.addEventListener('click', (e) => {
      console.log(e.target.dataset.name)
      switch (e.target.dataset.name) {
        case 'имперец':
          player = new Imperial({
            name: ''
          });
          break;
        case 'орк':
          player = new Org({
            name: ''
          });

          break;
        case 'маг':
          player = new Wizzard({
            name: ''
          });

          break;
        default:

      }
      document.querySelector('.person').style.display = 'none';
      document.querySelector('.select-name').style.display = 'block';
      store.player.set(player)

     document.querySelector('.select-name__input').selectNameInput.addEventListener('input', function (e) {
        player.name = this.value;

      })


    })
    document.querySelector('.select-name__btn').addEventListener('click', ()=>{
      document.querySelector('.select-name').style.display = 'none';
      document.querySelector('.playing-field').style.display = 'flex';


    })

  })
  
}
 function start(){
store.player.onChange(person => {
  const btnNext =  document.querySelector('.playing-field__btn--next')
  document.querySelector('.person-item__img--playing-field').children[0].src = person.img;
  document.querySelector('.person-item__name--player').innerText = person.name;
  document.querySelector('.person-item__name--enemy').innerText = enemy.name;
  document.querySelector('.person-item__img--enemy').children[0].src = enemy.img;
  
  document.querySelector('.playing-field__btn--start').addEventListener('click', ()=>{

               if(getRandomItem(randomMove) ===1){
                 document.querySelector('.playing-field__progress').innerText = 'Ход врага' 
                document.querySelector('.person-item__phrases').innerText = getRandomItem(phrasesOfenemies)
                document.querySelector('.playing-field__btn--start').style.display ='none';

                 window.setTimeout(()=>{
                  enemy.attack(person);
                  document.querySelector('.playing-field__progress').innerText = '' 
                  document.querySelector('.person-item__phrases').innerText = ''
                  document.querySelector('.playing-field__btn--start').style.display ='block';

                 },3000)
               
            }
        else{
          document.querySelector('.playing-field__progress').innerText = 'Ваш ход!' 

          document.querySelector('.playing-field__btn--start').style.display ='none';
          if(getRandomItem(randomMove)===1){

             const hitBtn= document.querySelector('.playing-field__btn--hit')
             hitBtn.style.display ='block';
             hitBtn.addEventListener('click',()=>{
              person.attack(enemy)
              hitBtn.style.display = 'none';
              document.querySelector('.playing-field__btn--start').style.display ='block';
              document.querySelector('.playing-field__progress').innerText = ''
             })
          }
          else{
             const superBtn= document.querySelector('.playing-field__btn--super')
             superBtn.style.display ='block';
             superBtn.addEventListener('click',()=>{
              person.superAttack(enemy)
              superBtn.style.display = 'none';
              document.querySelector('.playing-field__btn--start').style.display ='block';
              document.querySelector('.playing-field__progress').innerText = ''
             })
            }
            }
     
    if(enemy.hp<=0){
      document.querySelector('.playing-field__progress').innerText = 'вы победили!' 
      document.querySelector('.person-item__img--enemy').style.transform = 'rotate(90deg)';
      document.querySelector('.playing-field__btn--start').style.display ='none';

      btnNext.style.display = 'block'
      btnNext.addEventListener('click', ()=>{
        document.querySelector('.person-item__img--enemy').style.transform = 'rotate(0deg)';

         enemy = new Enemy(`${getRandomItem(lastNameEnemy)} ${getRandomItem(firstNameEnemy)}`, 100, 20, './images/imperial.png')
         console.log(enemy)
  document.querySelector('.person-item__img--enemy').children[0].src = enemy.img;

      })
    }
    if(person.hp<=0){
      document.querySelector('.playing-field__progress').innerText = 'вы проиграли!' 
      document.querySelector('.person-item__img--playing-field').style.transform = 'rotate(90deg)';
    }
    console.log(enemy)

  });

  });
}
  start()
  selectPerson();