let form = document.getElementById( 'form' );
let optionArr = ['shawarma', 'pizza', 'burger'];
let foodType = document.getElementById( 'foodType' );
let table = document.getElementById( 'table' );
function fillSelect() {
  for ( let index = 0; index < optionArr.length; index++ ) {
    let opt = document.createElement( 'option' );
    opt.textContent = optionArr[index];
    opt.value = optionArr[index];
    foodType.appendChild( opt );
  }
}
fillSelect();
renderH();
function Food( name, type, price, img ) {
  this.name = name;
  this.type = type;
  this.price = price;
  this.img = img;
  Food.all.push( this );
}
Food.all = [];
getData();
function getData() {
  if ( localStorage.food ) {
    let data = JSON.parse( localStorage.food );
    data.forEach( element => {
      let newObj = new Food( element.name, element.type, element.price, element.img );
      render( newObj );
    } );
  }
}
function setData() {
  localStorage.food = JSON.stringify( Food.all );
}
form.addEventListener( 'submit', foodShow );
function foodShow( e ) {
  e.preventDefault();
  let name = e.target.name.value;
  let type = e.target.foodType.value;
  let price = Math.floor( Math.random() * ( 44 - 4 + 1 ) ) + 4;
  let path = 'img/' + type + '.jpg';
  let newObj = new Food( name, type, price, path );
  setData();
  render( newObj );

}

function render( obj ) {
  let tr = document.createElement( 'tr' );
  table.appendChild( tr );
  let td2 = document.createElement( 'td' );
  td2.textContent = 'X';
  td2.id = 'remove';
  tr.appendChild( td2 );
  let td = document.createElement( 'td' );
  let i = document.createElement( 'img' );
  i.src = obj.img;
  i.style.height = '100px';
  i.style.width = '100px';
  td.appendChild( i );
  tr.appendChild( td );


  td2 = document.createElement( 'td' );
  td2.textContent = `Customer Name: ${obj.name} \n Food Type: ${obj.type} \n Food ${obj.price}: 27`;
  tr.appendChild( td2 );
}
table.addEventListener( 'click', removeRow );
function removeRow( e ) {
  console.log( 'click' );
  if ( e.target.id === 'remove' ) {
    e.target.parentElement.remove();
    Food.all.splice( e.target.parentElement.rowIndex - 1, 1 );
    setData();
  }
}


function renderH() {
  let tr = document.createElement( 'tr' );
  table.appendChild( tr );
  let td2 = document.createElement( 'th' );
  td2.textContent = '#';
  tr.appendChild( td2 );

  let td = document.createElement( 'th' );
  td.textContent = 'Image';
  tr.appendChild( td );

  td2 = document.createElement( 'th' );
  td2.textContent = 'Order Data';
  tr.appendChild( td2 );
}
