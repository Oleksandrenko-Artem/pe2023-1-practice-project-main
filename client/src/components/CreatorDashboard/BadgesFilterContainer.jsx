const BadgesFilterContainer = ({ creatorFilter, changePredicate, badgesParams}) => {
    const mapBadges = (b) =>
        creatorFilter[b.name] && (<li key={b.name}>
        {b.label}
        <button onClick={changePredicate({ name: b.name, value: b.defaultValue })}>
            X
        </button>
    </li>)
    return (
        <ul>
        {badgesParams.map(mapBadges)}
      </ul>
    );
}

export default BadgesFilterContainer;
