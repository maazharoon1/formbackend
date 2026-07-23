const { sendFormEmail } = require('./handler');

const FormController = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await sendFormEmail({ name, email, subject, message });

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('FormController error:', error);
    return res.status(500).json({ error: 'Unable to send email' });
  }
};

module.exports = { FormController };