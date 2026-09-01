export const EVENTS_STORAGE_KEY = 'contest-events';

export const getSavedEvents = () => {
    try {
        const rawEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        return rawEvents ? JSON.parse(rawEvents) : [];
    } catch (error) {
        return [];
    }
};

export const sortEventsByTarget = events => {
    if (!Array.isArray(events)) {
        return [];
    }

    return [...events].sort((firstEvent, secondEvent) => {
        const firstDate = new Date(firstEvent.targetDateTime).getTime();
        const secondDate = new Date(secondEvent.targetDateTime).getTime();
        return firstDate - secondDate;
    });
};

export const validateEventForm = ({
    name,
    date,
    time,
    notifyBeforeMinutes,
}) => {
    const errors = {};

    if (!name || !name.trim()) {
        errors.name = 'Event name is required';
    }

    if (!date) {
        errors.date = 'Event date is required';
    }

    if (!time) {
        errors.time = 'Event time is required';
    }

    if (!notifyBeforeMinutes && notifyBeforeMinutes !== 0) {
        errors.notifyBeforeMinutes = 'Reminder before event is required';
    }

    if (date && time) {
        const selectedDateTime = new Date(`${date}T${time}:00`).getTime();
        const now = Date.now();

        if (Number.isNaN(selectedDateTime) || selectedDateTime <= now) {
            errors.date = 'Event time must be in the future';
        }
    }

    return errors;
};

export const formatRemainingTime = milliseconds => {
    if (milliseconds <= 0) {
        return 'Time is up';
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
};

export const isEventDue = (event, now = Date.now()) => {
    if (!event || !event.targetDateTime) {
        return false;
    }

    return new Date(event.targetDateTime).getTime() <= now;
};

export const getDueEventsCount = events => {
    const savedEvents = Array.isArray(events) ? events : getSavedEvents();
    return savedEvents.filter(event => isEventDue(event)).length;
};

export const triggerEventsUpdated = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('contest-events-updated'));
    }
};
