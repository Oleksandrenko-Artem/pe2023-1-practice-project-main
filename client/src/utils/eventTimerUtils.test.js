import { sortEventsByTarget, validateEventForm, isEventDue } from './eventTimerUtils';

describe('eventTimerUtils', () => {
    it('sorts events by the nearest target date first', () => {
        const events = [
            { id: 'a', targetDateTime: '2026-12-31T12:00:00' },
            { id: 'b', targetDateTime: '2026-12-25T12:00:00' },
            { id: 'c', targetDateTime: '2026-12-29T12:00:00' },
        ];

        expect(sortEventsByTarget(events).map(event => event.id)).toEqual([
            'b',
            'c',
            'a',
        ]);
    });

    it('validates required form values and time in the future', () => {
        const emptyValues = validateEventForm({
            name: '',
            date: '',
            time: '',
            notifyBeforeMinutes: '',
        });

        expect(emptyValues.name).toBe('Event name is required');
        expect(emptyValues.date).toBe('Event date is required');
        expect(emptyValues.time).toBe('Event time is required');
        expect(emptyValues.notifyBeforeMinutes).toBe(
            'Reminder before event is required'
        );

        const invalidFuture = validateEventForm({
            name: 'Old event',
            date: '2020-01-01',
            time: '10:00',
            notifyBeforeMinutes: '30',
        });

        expect(invalidFuture.date).toBe('Event time must be in the future');
    });

    it('marks expired timers as due', () => {
        const event = { targetDateTime: '2020-01-01T10:00:00' };

        expect(isEventDue(event, new Date('2020-01-01T10:00:01').getTime())).toBe(true);
    });
});
