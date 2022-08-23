import React, { useState, useEffect }from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment'
import '../index.css';
import { Modal, Col,Form, Button, ModalFooter} from "react-bootstrap";
import DatePicker from "react-datepicker";

const CalendarBook = () => {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const [reason, setReason] = React.useState("");


  const hideModals = () => {
    setShowAddModal(false);
  };
var data;
 
  // const dummyEvents = [
  //   {
  //     allDay: false,
  //     endDate: new Date('December 10, 2022 11:13:00'),
  //     startDate: new Date('December 09, 2022 11:13:00'),
  //     title: 'hi',
  //   },
  //   {
  //     allDay: true,
  //     endDate: new Date('December 09, 2022 11:13:00'),
  //     startDate: new Date('December 09, 2022 11:13:00'),
  //     title: 'All Day Event',
  //   },
  //   ];
 
  
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(22,0,0);
    const [events, setEvents] = useState([]);

    const handleSelect = (event) => {
      setShowAddModal(true);
      let { start, end, reason } = event;
      start = new Date(start);
      end = new Date(end);
      const data = { start, end, reason };
      setStart(data.start);
      setEnd(data.end);
      setReason(data.reason);
    };
  
  const localizer = momentLocalizer(moment);
  let todos;
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch('https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda');
      res
        .json()
        .then(res => 
          {
            let todos = res.mentor.name;
            console.log(todos);
            setEvents(res.calendar)

          })
        .catch(err => console.log(err));
    }
    fetchEvents();
  }, []);
  console.log(todos)
  const event = events.map((slot, index) => {
    return  {
      'allDay': false,
      'start': moment.utc(slot.date_time).toDate(),
      'end': moment.utc(slot.date_time).add(60, 'minutes').toDate(),
      'reason': ''
    }
  })
  const handleClose = () => setShowAddModal(false);


          // console.log(res.mentor.name)
  return (
  
 <div className="sampleBook">  
       <Modal 
        show={showAddModal} 
        onHide={hideModals}>
        <Modal.Header >
          <Modal.Title>Book A Call with a Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
          <Form.Row>
              <Form.Group as={Col} md="12" controlId="start">
                <Form.Label>Start</Form.Label>
         
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="start">
                <Form.Label>Start Date</Form.Label>
                <br />
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={start}
                  //onChange={handleStartChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="end">
                <Form.Label>End</Form.Label>
                <br />
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={end}
                  //onChange={handleEndChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="reason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  autoFocus
                  placeholder="Reason"
                  value={reason || ""}
                 // onChange={handleReasonChange}
                  isInvalid={!reason}
                />
                <Form.Control.Feedback type="invalid">{!reason}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <ModalFooter>
                    <Button color="primary" onClick={handleClose}>Okay</Button>
                    <Button type="submit">
              Confirm Call
            </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>  
   <h2 className='text-center text-primary pb-3 pt-2'> Book A Mentor  </h2>

      <Calendar
        events ={event}
        formats={{ dateFormat: 'yyyy, mm, dd' }}
          step={60}
          localizer={localizer}
          style={{ height: '100vh' }}
          min = {minTime}
          max = {maxTime}
          views={['week']}
          defaultView='week'
          selectable={true}
          startAccessor='start'
          endAccessor='end'
          onSelectEvent={handleSelect}
        style={{ height: 500 }}
      />
</div>
  )
}

export default CalendarBook;
