import { FormGroup } from '@angular/forms';
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors.mustMatch){ return;};
        (control.value !== matchingControl.value) ? (matchingControl.setErrors({ mustMatch: true })) : (matchingControl.setErrors(null));
    }
}
