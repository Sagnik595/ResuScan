import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-indigo-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600">
          The page you are looking for does not exist.
        </p>

        <div className="mt-8">
          <Link to="/">
            <Button size="lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;