document.addEventListener('turbolinks:load', function() {
  sum(3,4)
  console.log(sum(3,4))
})

function sum(a,b){
  c = a + b

  return c
}

