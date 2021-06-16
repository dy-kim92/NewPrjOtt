import Vue from 'vue'
// extend => 유효성 검사할 규칙 추가
import { extend , ValidationObserver, ValidationProvider } from 'vee-validate'
import { email, required, numeric, max, confirmed, min } from 'vee-validate/dist/rules'

extend('required', {
    ...required,
    message: '{_field_}는 필수값 입니다.'
})
extend('numeric', numeric)
extend('email', {
    ...email,
    message: '{_field_}폼으로 입력해주세요.'
})
extend('max', {
    ...max,
    message: '{_field_}은 {length}자를 초과할 수 없습니다.'
})
extend('confirmed', {
    ...confirmed,
    message: '비밀번호가 일치하지 않습니다.'
})
extend('min', {
    ...min,
    message: '비밀번호는 8자리 이상 사용하세요.'
})
Vue.component('ValidationObserver',ValidationObserver)
Vue.component('ValidationProvider',ValidationProvider)