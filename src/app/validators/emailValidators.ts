import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const emailAlreadyTakenValidator = (authService: AuthService): AsyncValidatorFn => {
    return (control: AbstractControl) => {
        return authService.emailExists(control.value).pipe(
            map(emailExists => emailExists ? {emailTaken: true} : null)
        )
    }
}