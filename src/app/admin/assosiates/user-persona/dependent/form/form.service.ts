import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { User, AppPermission } from '@app/shell/models/user.model';
import { UserInfo } from '@app/shell/models/user.info.model';
import { map } from 'rxjs/operators';

export class UserPersonaFormService {
    constructor(private userRepoSrv: UserRepoService) {
    }
    save(permissions: AppPermission[], completeCallback: any) {
        this.userRepoSrv.saveAppPermissions(permissions).subscribe(el => {
            completeCallback(el);
        });
    }
    get(id: number, completeCallback: any) {
        const user: User = {} as User;
        return this.userRepoSrv.getUserInfoByUser(id).subscribe((el: UserInfo) => {
            user.displayname = el.firstname + ' ' + el.lastname;
            // user.email=el.email;
            return this.userRepoSrv.getAppPermissionsById(id).subscribe((sel: AppPermission[]) => {
                user.permissions = sel;
                completeCallback(user);
            });
        });
    }
    generateNew(): User {
        return {} as User;
    }
}