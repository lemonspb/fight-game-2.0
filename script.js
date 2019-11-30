
class Hero{
    constructor(hero){
      this.name = hero.name,
      this.hp = hero.hp,
      this.dg = hero.dg         
        
    }
    attack(enemy){
      enemy.hp  -= this.dg;  
    }
}

class Imperial extends Hero{
constructor(hero){
  super(hero)
  this.name = hero.name,
  this.hp = 100,
  this.dg = 20
}
 superAttack(enemy){
  enemy.hp  -= this.dg*2;
 }
} 
class Org extends Hero{
  constructor(hero){
    super(hero)
    this.hp = 200,
    this.dg = 50
  }
  
  } 

  class Wizzard extends Hero{
    constructor(hero){
      super(hero)
      this.hp = 200,
      this.dg = 50
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



const initGame = () => {
  let player

document.querySelectorAll('.person-item__img').forEach((person)=>{
  person.addEventListener('click', (e)=>{
    console.log(e.target.dataset.name)
    switch (e.target.dataset.name) {
      case 'имперец':
          player  = new Imperial({name:''});
        break;
      case 'орк':
          store.player.set(new Org({name:''}));
        
        break;
      case 'маг':
          store.player.set(new Wizzard({name:''}));
         
        break;
      default:
        
    }
   document.querySelector('.person').style.display = 'none'; 
  document.querySelector('.select-name').style.display = 'block';
  
  const  selectNameInput = document.querySelector('.select-name__input')
  selectNameInput.addEventListener('input', function(e){
    player.name = this.value
    console.log(player)
  })
  

  })

})
}
// store.player.onChange(person => {
//   console.log(person)
//   });

initGame();

