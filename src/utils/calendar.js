// Generate Google Calendar Link
export const getGoogleCalendarUrl = ({ title, description, venue, startIso, endIso }) => {
  const formatTime = (isoString) => {
    return new Date(isoString).toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const startFormatted = formatTime(startIso);
  const endFormatted = formatTime(endIso);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Vinay & Navisha's Wedding — ${title}`,
    details: `${description}\n\nCouple: Vinay & Navisha\nHashtag: #VinayWedsNavisha`,
    location: venue,
    dates: `${startFormatted}/${endFormatted}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Generate and Download .ics File for Apple Calendar / Outlook / Mobile
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
    "PRODID:-//Vinay and Navisha Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-${Date.now()}@vinaynavisha.com`,
    `DTSTAMP:${nowFormatted}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:Vinay & Navisha Wedding: ${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${venue}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${title} — Vinay & Navisha's Wedding`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `Vinay-Navisha-${title.replace(/[^a-zA-Z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
