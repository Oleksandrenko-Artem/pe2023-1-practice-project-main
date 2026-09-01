import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './Events.module.sass';
import {
  EVENTS_STORAGE_KEY,
  formatRemainingTime,
  getSavedEvents,
  isEventDue,
  sortEventsByTarget,
  triggerEventsUpdated,
  validateEventForm,
} from '../../utils/eventTimerUtils';
import CONSTANTS from '../../constants';

const EMPTY_FORM = {
  name: '',
  date: '',
  time: '',
  notifyBeforeMinutes: '',
};

const EventTimerCard = ({ event, onRemove }) => {
  const [remaining, setRemaining] = useState(
    Math.max(new Date(event.targetDateTime).getTime() - Date.now(), 0)
  );

  useEffect(() => {
    const updateRemaining = () => {
      setRemaining(
        Math.max(new Date(event.targetDateTime).getTime() - Date.now(), 0)
      );
    };

    updateRemaining();
    const intervalId = window.setInterval(updateRemaining, 1000);

    return () => window.clearInterval(intervalId);
  }, [event.targetDateTime]);

  const due = isEventDue(event);
  const startTime = new Date(event.createdAt || Date.now()).getTime();
  const targetTime = new Date(event.targetDateTime).getTime();
  const totalDuration = Math.max(targetTime - startTime, 1000);
  const elapsed = Math.min(Date.now() - startTime, totalDuration);
  const progress = due ? 100 : Math.min(100, (elapsed / totalDuration) * 100);
  const fillStyle = {
    width: `${progress}%`,
    backgroundColor: due ? '#dc2626' : '#22c55e',
  };

  return (
    <li
      className={`${styles.timerCard} ${due ? styles.dueTimer : styles.activeTimer}`}
    >
      <div className={styles.progressLayer} style={fillStyle} />

      <div className={styles.cardHeader}>
        <div>
          <h3>{event.name}</h3>
        </div>
        <div className={styles.cardTitle}>
          <span className={due ? styles.dueTag : styles.countdownTag}>
            {due ? 'Due now' : formatRemainingTime(remaining)}
          </span>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onRemove(event.id)}
            aria-label={`Delete ${event.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

const EventsPage = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [events, setEvents] = useState(() => getSavedEvents());

  useEffect(() => {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    triggerEventsUpdated();
  }, [events]);

  const sortedEvents = useMemo(() => sortEventsByTarget(events), [events]);
  const dueEventsCount = sortedEvents.filter((event) =>
    isEventDue(event)
  ).length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateEventForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const targetDateTime = `${form.date}T${form.time}:00`;
    const nextEvent = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: form.name.trim(),
      date: form.date,
      time: form.time,
      notifyBeforeMinutes: Number(form.notifyBeforeMinutes),
      targetDateTime,
      createdAt: new Date().toISOString(),
    };

    setEvents((prevEvents) => sortEventsByTarget([...prevEvents, nextEvent]));
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleRemove = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className={styles.eventsPage}>
      <Header />

      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <div>
            <span className={styles.eyebrow}>Planning</span>
            <h1>Events</h1>
          </div>
          {dueEventsCount > 0 && (
            <span className={styles.redBadge}>{dueEventsCount}</span>
          )}
        </div>

        <div className={styles.layout}>
          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <h2>Create a countdown</h2>

            <div className={styles.fieldGroup}>
              <label htmlFor="event-name">Event name</label>
              <input
                id="event-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="For example: New Year campaign"
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.rowFields}>
              <div className={styles.fieldGroup}>
                <label htmlFor="event-date">Date</label>
                <input
                  id="event-date"
                  type="date"
                  name="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <span className={styles.error}>{errors.date}</span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="event-time">Time</label>
                <input
                  id="event-time"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
                {errors.time && (
                  <span className={styles.error}>{errors.time}</span>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="event-reminder">
                Notify before event (minutes)
              </label>
              <input
                id="event-reminder"
                type="number"
                name="notifyBeforeMinutes"
                min="1"
                step="1"
                value={form.notifyBeforeMinutes}
                onChange={handleChange}
                placeholder="30"
              />
              {errors.notifyBeforeMinutes && (
                <span className={styles.error}>
                  {errors.notifyBeforeMinutes}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              Add timer
            </button>
          </form>

          <section className={styles.listCard}>
            <div className={styles.listHeader}>
              <h2>Live upcoming checks</h2>
              <span className={styles.listCounter}>
                Remaining time
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}clock-time-eight-outline.svg`}
                  alt="clock"
                />
              </span>
            </div>

            {sortedEvents.length === 0 ? (
              <div className={styles.emptyState}>
                No events yet. Add the next important date and never miss it.
              </div>
            ) : (
              <ul className={styles.timerList}>
                {sortedEvents.map((event) => (
                  <EventTimerCard
                    key={event.id}
                    event={event}
                    onRemove={handleRemove}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
