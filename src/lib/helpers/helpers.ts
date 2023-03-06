import appState from "../../stores/appState";

export const sortByDate = data => {
	if (appState.sortOrder === null) {
		appState.sortOrder = "asc";
	} else if (appState.sortOrder === "asc") {
		appState.sortOrder = "desc";
	} else if (appState.sortOrder === "desc") {
		appState.sortOrder = null;
	}

	let sortedData = data.slice();

	if (!appState.sortOrder) {
		appState.isSorted = false;
		return;
	}
	if (appState.sortOrder) {
		appState.isSorted = true;
		sortedData = sortedData.sort((a, b) => {
			const valueA = a.date;
			const valueB = b.date;

			const reverseOrder = appState.sortOrder === "asc" ? 1 : -1;
			return (valueA - valueB) * reverseOrder;
		});
	}

	return {
		sortedData,
	};
};
