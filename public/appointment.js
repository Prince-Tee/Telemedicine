document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');

    // Fetch doctors for dropdown
    fetch('http://localhost:5000/api/doctors')
    .then(response => response.json())
    .then(doctors => {
        const doctorSelect = document.getElementById('doctor');
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} - ${doctor.specialization}`;
            doctorSelect.appendChild(option);
        });
    });

    // Handle appointment booking
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const patient_id = localStorage.getItem('patient_id');  // Assuming patient ID is stored locally
        const doctor_id = document.getElementById('doctor').value;
        const appointment_date = document.getElementById('date').value;

        fetch('http://localhost:5000/api/appointments/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patient_id, doctor_id, appointment_date })
        })
        .then(response => response.json())
        .then(data => {
            alert('Appointment booked successfully');
        })
        .catch(error => console.error('Error:', error));
    });
});
