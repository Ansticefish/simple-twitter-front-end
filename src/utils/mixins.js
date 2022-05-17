import moment from 'moment'

export const preventInputBlank = {
    watch: {
        'account': {
            handler: function () {
                if (!this.account.trim()) {
                    this.a.error = true
                    this.a.warning = '此欄位不可空白'
                } else if (this.account.length > 50) {
                    this.a.error = true
                    this.a.warning = '字數超出上限！'
                    this.isProcessing = true
                } else {
                    this.a.error = false
                    this.a.warning = ''
                    this.isProcessing = false
                }
            }
        },
        'name': {
            handler: function () {
                if (!this.name.trim()) {
                    this.n.error = true
                    this.n.warning = '此欄位不可空白'
                } else if (this.name.length > 50) {
                    this.n.error = true
                    this.n.warning = '字數超出上限！'
                    this.isProcessing = true
                } else {
                    this.n.error = false
                    this.n.warning = ''
                    this.isProcessing = false
                }
            }
        },
        'email': {
            handler: function () {
                if (!this.email.trim()) {
                    this.m.error = true
                    this.m.warning = '此欄位不可空白'
                } else {
                    this.m.error = false
                    this.m.warning = ''
                }
            }
        },
        'password': {
            handler: function () {
                if (!this.password.trim()) {
                    this.p.error = true
                    this.p.warning = '此欄位不可空白'
                } else {
                    this.p.error = false
                    this.p.warning = ''
                }
            }
        },
        'checkPassword': {
            handler: function () {
                if (!this.checkPassword.trim()) {
                    this.cp.error = true
                    this.cp.warning = '此欄位不可空白'
                } else {
                    this.cp.error = false
                    this.cp.warning = ''
                }
            }
        },
    }
}

export const accountShow = {
    filters: {
        accountShow(account) {
            return `@${account}`
        }
    },
}

export const emptyCover = {
    filters: {
        emptyCover(coverURL) {
            return coverURL || "https://imgpile.com/images/5SSoXP.png";
        },
    },
}

export const emptyAvatar = {
    filters: {
        emptyAvatar(imgURL) {
            return imgURL || "https://imgpile.com/images/5S6lFC.png"
        },
    }
}
export const fromNow = {
    filters: {
        fromNow(datetime) {
            return datetime ? moment(datetime).fromNow() : '--'
        }
    }
}