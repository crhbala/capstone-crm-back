
const router = require("express").Router();
const Ticket = require("../../models/Ticket");


//ticket dashboard information 
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all tickets assigned to the employee
    const tickets = await Ticket.find({ client: userId });

    // Calculate ticket statistics
    const totalTickets = tickets.length;
    const openTickets = tickets.filter((ticket) => ticket.status === 'open').length;
    const inProgressTickets = tickets.filter((ticket) => ticket.status === 'in-progress').length;
    const closedTickets = tickets.filter((ticket) => ticket.status === 'closed').length;
    
    // Find completed tickets and sort them by completion date in descending order

    const completedTickets = tickets
      .filter((ticket) => ticket.status === 'closed')
      .sort((a, b) => b.date - a.date);


    // Send the ticket statistics as a response
    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
      tickets,
      completedTickets  
    });
  } catch (error) {
    console.error('Error fetching ticket information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;