import * as Yup from "yup"
export default function equalTo(ref, msg) {
    return Yup.mixed().test({
        name: 'equalTo',
        exclusive: false,
        message: msg,
        params: {
            reference: ref.path,
        },
        test: function (value) {
            return value === this.resolve(ref);
        },
    });
}
