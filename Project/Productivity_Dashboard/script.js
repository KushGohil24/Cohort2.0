var allElem = document.querySelectorAll('.elem');
var allFullElem = document.querySelectorAll('.fullElem');
var allFullElemBackBtn = document.querySelectorAll('.fullElem .back');
console.log(allElem);
allElem.forEach(function(elem) {
    elem.addEventListener('click', function() {
        allFullElem[elem.id].style.display = 'block';
    });
});
allFullElemBackBtn.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        allFullElem[index].style.display = 'none';
    });
});