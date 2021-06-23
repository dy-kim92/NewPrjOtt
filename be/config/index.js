module.exports = {
  jwt: {
      secretKey: 'asdfdczwer',
      algorithm: 'HS256',    
      subject: 'user-token',
      expiresIn: 60 * 20 , // 기본 3분
      expiresInRemember: 60 * 60 * 24 * 6, // 기억하기 눌렀을 때 6일
      expiresInDiv: 3, // 토큰시간 나누는 기준
}
}