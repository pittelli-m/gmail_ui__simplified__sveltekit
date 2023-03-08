import { writable, get } from "svelte/store";

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
// @ts-ignore
const sortByDate = data => {
	// @ts-ignore
	data = data.sort((a, b) => {
		const valueA = new Date(a.date).getTime();
		const valueB = new Date(b.date).getTime();
		return valueB - valueA;
	});

	return data;
};

const initialState = {
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
	inboxShown: "inbox",

	openDraft: null,
	displayedMail: null,
	isSearching: false,
};

const isBrowser = typeof window !== "undefined";

const localState = isBrowser && localStorage.getItem("state");

if (!localState) {
	// @ts-ignore
	isBrowser && localStorage.setItem("state", JSON.stringify(initialState));
}
// @ts-ignore
const state = localState ? await JSON.parse(localState) : initialState;

const stored = writable(state);

const appState = writable({ ...state, sortByDate });

// @ts-ignore
export const update = state => {
	const updatedState = state;
	stored.update(() => updatedState); //sets the whole state to whatever is passed in as updatedState
	localStorage.setItem("state", JSON.stringify(updatedState));
};

export default appState;

// TODO add firebase
