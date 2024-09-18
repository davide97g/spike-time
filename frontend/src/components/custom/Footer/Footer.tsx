export function Footer() {
  return (
    <footer
      className="flex justify-center items-center bg-background border-t absolute bottom-0"
      style={{
        width: "calc(98vw - 2rem)",
      }}
    >
      <div className="text-sm text-muted-foreground">
        &copy; 2021 Spike Time
      </div>
      <a
        href="https://www.flaticon.com/free-icons/sporting"
        title="sporting icons"
        className="text-xs text-muted-foreground"
      >
        Sporting icons created by juicy_fish - Flaticon
      </a>
    </footer>
  );
}
