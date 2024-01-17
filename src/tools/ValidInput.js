function isEmail(email){
  const validRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+(\.[A-Za-z]+)+$/i;

  return validRegex.test(email ?? "");
}



function isPassword(password){
  return password && password.length >= 8;
}



function isName(name){
  return name && name.length >= 1 && name.length <= 30;
}



function isPriority(priority){
  return ['low', 'medium', 'high'].includes(priority.toLowerCase());
}



function isTitle(title){
  return title.length > 0 && title.length <= 200;
}


module.exports = {
  isEmail,
  isPassword,
  isName,
  isPriority,
  isTitle,
};
