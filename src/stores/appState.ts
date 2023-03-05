import { writable } from "svelte/store";

const setMail = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	const users = await res.json();
	// @ts-ignore
	const baseMail = users.map(user => {
		return {
			from: user.name,
			email: `${user.email}`.toLowerCase(),
			object: user.company.name,
			body: `${user.company.catchPhrase} - ${user.company.bs}`.repeat(20),
			date: new Date(),
			isStarred: false,
		};
	});
	// @ts-ignore

	return baseMail;
};

const appState = writable({
	isWriting: false,
	searchTerm: "",
	isDirty: false,
	allMail: await setMail(),
	starred: [],
	drafts: [],
	sent: [],
	isSorted: false,
	sortOrder: null,
	menuSelected: "inbox",
	id: Math.round(Math.random() * 99999),
});

export default appState;
