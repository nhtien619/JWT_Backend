import registerService from '../service/registerService';


const testApiData = (req, res) => {
    let data = ['1', '2', '3'];
    return res.status(200).json({
        message: 'OK',
        data: data
    })
}

const handleRegister = async (req, res) => {
    try {
        //? req.body: email, phone, username, password
        console.log('>>>> handleRegister: ', req.body);

        if (!req.body.registerData.email || !req.body.registerData.phone || !req.body.registerData.password) {
            return res.status(200).json({
                code: -200,
                message: 'Error - Missing required paramaters',
                data: ''
            })
        }

        if (req.body.registerData.password && req.body.registerData.password < 8) {
            return res.status(200).json({
                code: -201,
                message: 'Error - Password must not have less than 8 letters',
                data: ''
            })
        }

        //? service: Create user
        let rs = await registerService.registerNewUser(req.body.registerData);

        console.log('>> handleRegister return: ', rs);

        //? return 
        return res.status(200).json({
            code: rs.code,
            message: rs.code > 0 ? 'Successfully - User was created !' : rs.message,
            data: ''
        })

    } catch (ex) {
        console.log('userController:', ex);

        return res.status(500).json({
            code: -500,
            message: 'Error - Missing required paramaters',
            data: req.body
        })
    }

}


module.exports = { testApiData, handleRegister }