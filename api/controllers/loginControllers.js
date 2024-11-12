exports.renderInitialPage = (req, res) => {
    res.render('main/initial');  // Make sure this path is correct
  };

exports.renderUserLoginPage = (req, res) => {
    res.render('main/userLogin'); 
}

exports.renderHospitalLoginPage = (req, res) => {
    res.render('main/hosLogin'); 
}

exports.renderHospitalRegisterPage = (req, res) => {
    res.render('main/hosReg'); 
}