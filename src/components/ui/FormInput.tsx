"use client"

import FormInputProps from "../../types/FormInput";

export default function FormInput({ type, title, placeholder, inputValue, setEmail = () => { }, setPassword = () => { }, setText = () => { }, setDate = () => { } }: FormInputProps) {
  return (
    <>
      {
        type == 'email' ?
          <div>
            <h1 className="form-input-title">{title}</h1>
            <input
              type="email"
              className="form-input"
              placeholder={placeholder}
              onChange={(e) => setEmail(e.target.value)}
              value={inputValue}
              required
            />
          </div>
          : type == 'password' ?
            <div>
              <h1 className="form-input-title">{title}</h1>
              <input
                type="password"
                className="form-input"
                placeholder={placeholder}
                onChange={(e) => setPassword(e.target.value)}
                value={inputValue}
                required
              />
            </div>
            : type == 'text' ?
              <div>
                <h1 className="form-input-title">{title}</h1>
                <input
                  type="text"
                  className="form-input"
                  placeholder={placeholder}
                  onChange={(e) => setText(e.target.value)}
                  value={inputValue}
                  required
                />
              </div>
              : type == 'date' ?
                <div>
                  <h1 className="form-input-title">{title}</h1>
                  <input
                    type="date"
                    className="form-input"
                    placeholder={placeholder}
                    onChange={(e) => setDate(e.target.value)}
                    value={inputValue}
                    required
                  />
                </div> : null
      }
    </>
  )
}