// Generate Google Calendar Link
export const getGoogleCalendarUrl = ({ title, description, venue, startIso, endIso }) => {
  const formatTime = (isoString) => {
    return new Date(isoString).toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const startFormatted = formatTime(startIso);
  const endFormatted = formatTime(endIso);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding — ${title}`,
    details: `${description}\n\nCouples: Vinay weds Navisha and Sumit weds Bhawna`,
    location: venue,
    dates: `${startFormatted}/${endFormatted}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Generate and Open / Download for Apple Calendar (launches native sheet on iOS/Mac, downloads .ics on Windows/Android)
export const downloadIcsFile = ({ title, description, venue, startIso, endIso }) => {
  const formatTime = (isoString) => {
    return new Date(isoString).toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const startFormatted = formatTime(startIso);
  const endFormatted = formatTime(endIso);
  const nowFormatted = formatTime(new Date().toISOString());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vinay Navisha Sumit Bhawna Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-${Date.now()}@weddinginvitation.com`,
    `DTSTAMP:${nowFormatted}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:Wedding: ${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${venue}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${title}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  // On iOS / Mac Safari, data:text/calendar opens the native Apple Calendar "Add Event" sheet directly
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
  if (isApple) {
    const calendarUri = "data:text/calendar;charset=utf8," + encodeURIComponent(icsContent);
    window.location.href = calendarUri;
    return;
  }

  // On Windows / Android, download .ics file which opens Outlook or default desktop calendar
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `Wedding-${title.replace(/[^a-zA-Z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
