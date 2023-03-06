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
			isRead: false,
			id: Math.round(Math.random() * 99999),
		};
	});
	// @ts-ignore

	return baseMail;
};

const sortByDate = data => {
	let sortedData = data.slice();

	if (appState.sortOrder) {
		appState.isSorted = false;
		return sortedData;
	}
	if (appState.sortOrder) {
		appState.isSorted = true;
		sortedData = sortedData.sort((a, b) => {
			const valueA = new Date(a.date).getTime();
			const valueB = new Date(b.date).getTime();

			const reverseOrder = appState.sortOrder === "asc" ? 1 : -1;
			return (valueA - valueB) * reverseOrder;
		});
	}
	console.log(appState.sortOrder);
	return sortedData;
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
	inboxShown: "inbox",
	sortByDate,
	openDraft: null,
	displayedMail: null,
});

export default appState;
