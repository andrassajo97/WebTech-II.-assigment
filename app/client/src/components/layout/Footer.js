import React from "react";

export default function Footer() {
  return (
    <footer className="fixed-bottom text-center footer mt-auto py-3 bg-dark">
      <div className="container">
        <span className="text-muted">
          Copyright &copy; {new Date().getFullYear()} Handball-base
        </span>
      </div>
    </footer>
  );
}
