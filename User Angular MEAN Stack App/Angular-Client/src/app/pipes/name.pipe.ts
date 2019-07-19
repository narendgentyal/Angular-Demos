import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'name'
})
export class NamePipe implements PipeTransform {

	transform(usersList: any, searchText: any) {
		let updatedUsersList: any;

		if (searchText)
			updatedUsersList = usersList.filter(user =>
				user.firstName.toLowerCase()
					.startsWith(searchText.toLowerCase()));
		else
			updatedUsersList = usersList;

		return updatedUsersList;
	}


}
