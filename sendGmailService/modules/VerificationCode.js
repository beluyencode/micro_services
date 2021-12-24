
module.exports = class VerificationCode {

    constructor() {
        this.arrCodes = [];
    }

    createCode(gmail) {
        let VerificationCode = Math.floor(Math.random() * 89999 + 10000);
        this.arrCodes.push({
            gmail: gmail,
            code: VerificationCode
        });
        return VerificationCode;
    }


    deleteCode(gmail) {
        this.arrCodes = this.arrCodes.filter(item => item.gmail !== gmail)
    }

    verifyCode(gmail, code) {
        let user = this.arrCodes.filter(item => item.gmail === gmail);
        if (user.length === 0) {
            return false;
        }
        if (code === user[0].code) {
            return true;
        } else {
            return false;
        }
    }

}

