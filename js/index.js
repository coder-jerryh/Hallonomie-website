const iframeDom = document.getElementById('iframe')
const urls = {
  qrCode: 'https://www.youtube.com/embed/3EK3bAfDghI',
  takeaway: 'https://www.youtube.com/embed/mvQUiXR-8TM'
}
function openVideo (id) {
  document.querySelector('iframe').src = urls[id]
  iframeDom.style.visibility = 'visible'
  iframeDom.style.opacity = 1
}
function closeVideo () {
  document.querySelector('iframe').src = ''
  iframeDom.style.visibility = 'hidden'
  iframeDom.style.opacity = 0
}
function showMenu() {
  document.querySelector('#showMenu').style.display = 'none'
  document.querySelector('#closeMenu').style.display = 'inline-block'
  document.querySelector('#menu').classList.add('showMenu')
}
function closeMenu() {
  document.querySelector('#showMenu').style.display = 'inline-block'
  document.querySelector('#closeMenu').style.display = 'none'
  document.querySelector('#menu').classList.remove('showMenu')
}