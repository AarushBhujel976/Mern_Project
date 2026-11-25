export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'ME';
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
};

export const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const hashHue = (value = '') =>
  [...value].reduce((total, char) => total + char.charCodeAt(0), 0) % 360;
