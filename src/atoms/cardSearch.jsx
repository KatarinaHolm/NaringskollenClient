export default function CardSearch({ children, title }) {
  return (
    <div className="card bg-base-100 w-full max-w-lg my-8">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// bg-primary text-primary-content
