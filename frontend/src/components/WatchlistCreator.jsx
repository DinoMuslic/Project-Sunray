import { useEffect, useState } from "react";
import Select from "react-select";
import { getTitles, addTitle, getCount } from "../services/TitleService";
import { getWatchlists, addWatchlist } from "../services/WatchlistService";
import "./WatchlistCreator.css";

const WatchListCreator = () => {
  const selectOptions = [
    { value: "movie", label: "Movies" },
    { value: "series", label: "Series" },
  ];

  const [availableTitles, setAvailableTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [isWatchlistBtnDisabled, setIsWatchlistBtnDisabled] = useState(true);
  const [watchlists, setWatchlists] = useState([]);

  const fetchTitles = async () => {
    try {
      const fetchedTitles = await getTitles();
      const uniqueTitles = Array.from(
        new Map(
          fetchedTitles.map((item) => [
            item.title,
            { value: item.title.toLowerCase(), label: item.title },
          ])
        ).values()
      );
      setAvailableTitles(uniqueTitles);
    } catch (err) {
      console.error("Error fetching titles:", err);
    }
  };

  const fetchWatchlists = async () => {
    try {
      const fetchedWatchlists = await getWatchlists();
      setWatchlists(fetchedWatchlists);
    } catch (err) {
      console.error("Error fetching titles:", err);
    }
  };

  const [titleCounts, setTitleCounts] = useState([]);

  const fetchTitleCounts = async () => {
    try {
      const fetchedCounts = await getCount();
      setTitleCounts(fetchedCounts);
    } catch (err) {
      console.error("Error fetching title counts:", err);
    }
  };

  useEffect(() => {
    fetchTitles();
    fetchWatchlists();
    fetchTitleCounts();
  }, []);

  const handleInput = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);

    const trimmed = newTitle.trim();
    const validPattern = /^[a-zA-Z0-9:,\'\s]+$/;
    const hasAlphaNum = /[a-zA-Z0-9]/.test(trimmed);
    const isValid =
      trimmed.length >= 3 && validPattern.test(trimmed) && hasAlphaNum;

    setIsBtnDisabled(!isValid);
  };

  const handleAddTitle = async () => {
    if (!title || !category) return;

    try {
      await addTitle({ title: title, category: category });
      setTitle("");
      setCategory("");
      setIsBtnDisabled(true);
      fetchTitles();
    } catch (err) {
      console.error("Error adding title:", err);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleAddWatchlist = async () => {
    if (selectedTitles.length < 3) {
      setErrorMessage(
        "Please select at least 3 titles before saving your watchlist."
      );
      return;
    }

    const payload = { titles: selectedTitles.map((item) => item.label) };

    try {
      await addWatchlist({
        name: `Watchlist #${watchlists.length + 1}`,
        ...payload,
      });
      setSelectedTitles([]);
      setIsWatchlistBtnDisabled(true);
      fetchWatchlists();
      setErrorMessage("");
    } catch (err) {
      console.error("Error saving watchlist:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Failed to save watchlist.");
      }
    }
  };

  return (
    <div className="watchlist-creator-container">
      <h1>Watchlist Creator</h1>
      <p>Build and save your personal movies & series watchlist.</p>

      <div className="select-container">
        <h3>Select category:</h3>
        <Select
          options={selectOptions}
          value={
            category
              ? selectOptions.find((opt) => opt.value === category)
              : null
          }
          onChange={(selectedOption) => setCategory(selectedOption.value)}
          placeholder="Select category"
        />

        <h3>Add title</h3>
        <div className="input-button">
          <input
            value={title}
            onChange={handleInput}
            type="text"
            placeholder="Enter a movie or series title..."
          />
          <button
            onClick={handleAddTitle}
            disabled={isBtnDisabled || !category}
          >
            +
          </button>
        </div>
        {isBtnDisabled && (
          <p>
            Please enter a valid title (min 3 characters & no uncommon
            characters).
          </p>
        )}

        <h3>Your available Titles</h3>
        <Select
          options={availableTitles}
          isMulti
          value={selectedTitles}
          onChange={(selected) => {
            setSelectedTitles(selected);
            setIsWatchlistBtnDisabled(!selected || selected.length < 3);
          }}
        />

        <div className="save-watchlist-btn-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            className="save-watchlist-btn"
            disabled={isWatchlistBtnDisabled}
            title="Add at least 3 titles to save your watchlist."
            onClick={handleAddWatchlist}
          >
            SAVE WATCHLIST
          </button>
          <p>Add at least 3 titles to save your watchlist.</p>
        </div>
      </div>

      <div className="info-container">
        <h3>Most Popular Titles</h3>
        <div className="title-counts">
          {titleCounts.length === 0 ? (
            <p>No popular titles yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {titleCounts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <h3>All Submitted Watchlists</h3>
        {watchlists.length === 0 ? (
          <p>No watchlists yet.</p>
        ) : (
          <div className="watchlist-list">
            {watchlists.map((wl, index) => (
              <div key={index} className="watchlist-row">
                <div className="watchlist-name">{wl.name}</div>
                <div className="watchlist-titles">
                  {Array.isArray(wl.titles) ? wl.titles.join(", ") : wl.titles}
                </div>
                {index < watchlists.length - 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchListCreator;
