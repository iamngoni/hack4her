const nodemailer = require("nodemailer");

class Email{
  constructor(member){
    this.member = member;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'imngonii@gmail.com',
        pass: 'Nickm@ng13'
      }
    });

    this.mailOptions = {
      from: 'Hack4Her <inbiltteam@hack4her.web>',
      to: this.member.email
    };
  }

  /**
   * Send Password Reset Key To Member Through Email
   */
  async sendPasswordResetEmail(){
    this.mailOptions.subject = "Password Reset";
    this.mailOptions.text = "wForumZ Password Reset Key: " + this.member.passwordResetKey;
    await this._send();
  }

  /**
   * Send email
   */
  async _send(){
    this.transporter.sendMail(this.mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}