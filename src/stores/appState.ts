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
	data = data.sort((a, b) => {
		const valueA = new Date(a.date).getTime();
		const valueB = new Date(b.date).getTime();
		return valueB - valueA;
	});

	return data;
};

const appState = writable({
	isWriting: false,
	searchTerm: "",
	isDirty: false,
	allMail: await setMail(),
	allMailSorted: [],
	starred: [],
	drafts: [],
	sent: [],
	starredSorted: [],
	draftsSorted: [],
	sentSorted: [],
	filtered: [],
	filteredSorted: [],
	isSorted: false,
	menuSelected: "inbox",
	id: Math.round(Math.random() * 99999),
	inboxShown: "inbox",
	sortByDate,
	openDraft: null,
	displayedMail: null,
	isSearching: false,
});

export default appState;

// TODO add firebase
