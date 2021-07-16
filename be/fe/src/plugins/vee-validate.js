import Vue from 'vue'
// extend => 유효성 검사할 규칙 추가
import { extend , ValidationObserver, ValidationProvider } from 'vee-validate'
import { email, required, numeric, max, confirmed, min } from 'vee-validate/dist/rules'

extend('required', {
    ...required,
    message: '{_field_} is required.'
})
extend('numeric', numeric)
extend('email', {
    ...email,
    message: 'Please enter the appropriate {_field_}.'
})
extend('max', {
    ...max,
    message: '{_field_} is at least {length} digits.'
})
extend('confirmed', {
    ...confirmed,
    message: 'Passwords do not match.'
})
extend('min', {
    ...min,
    message: 'Password is at least 8 digits.'
})
Vue.component('ValidationObserver',ValidationObserver)
Vue.component('ValidationProvider',ValidationProvider)