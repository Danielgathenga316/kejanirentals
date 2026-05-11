import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Rentalcart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(() => {
    const saved = window.localStorage.getItem('rentalCart')
    return saved ? JSON.parse(saved) : []
  })
  const [finalChoiceId, setFinalChoiceId] = useState(null)
  const imgurl = 'https://mamba1daniel.alwaysdata.net/api/static/images/'

  useEffect(() => {
    window.localStorage.setItem('rentalCart', JSON.stringify(cartItems))
    if (!cartItems.some((item) => item.rental_id === finalChoiceId)) {
      setFinalChoiceId(null)
    }
  }, [cartItems, finalChoiceId])

  const removeItem = (rentalId) => {
    setCartItems((prev) => prev.filter((item) => item.rental_id !== rentalId))
  }

  const handleFinalize = () => {
    const selected = cartItems.find((item) => item.rental_id === finalChoiceId)
    if (!selected) return
    navigate('/mpesa', { state: { rental: selected } })
  }

  return (
    <div className="row justify-content-center min-vh-100 rentals-page">
      <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h2 className="mb-1"> Rental Cart</h2>
            <p className="text-muted mb-0">Select one final rental from the choices below.</p>
          </div>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/getrental')}>
            Continue Browsing
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="alert alert-info">
            Your cart is empty. Add rentals from the list to review and choose the final option.
          </div>
        ) : (
          <div className="list-group">
            {cartItems.map((rental) => (
              <div key={rental.rental_id} className="list-group-item mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={rental.rental_photo_url || `${imgurl}${encodeURIComponent(rental.rental_photo || '')}`}
                      alt={rental.rental_street || rental.rental_name}
                      className="img-fluid rounded"
                      style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-1">{rental.rental_street || rental.rental_name}</h5>
                    <p className="mb-1 text-muted">{rental.rental_location}</p>
                    <p className="text-warning fw-bold mb-1">Ksh {rental.rental_price} /month</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="finalChoice"
                        id={`final-${rental.rental_id}`}
                        checked={finalChoiceId === rental.rental_id}
                        onChange={() => setFinalChoiceId(rental.rental_id)}
                      />
                      <label className="form-check-label" htmlFor={`final-${rental.rental_id}`}>
                        Choose this rental as final decision
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeItem(rental.rental_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setFinalChoiceId(cartItems[0]?.rental_id || null)}
            >
              Pick first option
            </button>
            <button
              className="btn btn-primary"
              disabled={!finalChoiceId}
              onClick={handleFinalize}
            >
              Finalize Decision
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Rentalcart
