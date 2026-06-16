function doPost(e) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet()
  
  // Auto-create headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Phone',
      'Concern', 'Payment ID', 'Status',
      'Booking Date', 'Booking Time'
    ])
  }

  const raw = e.postData.contents
  const data = JSON.parse(raw)

  // From website payment form
  if (data.type === 'payment') {
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.concern || '',
      data.paymentId,
      'PAID',
      '',
      '',
    ])
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  // From Calendly webhook directly
  if (data.event === 'invitee.created') {
    const invitee = data.payload.invitee
    const eventTime = data.payload.event

    const name = invitee.name || ''
    const email = invitee.email || ''
    const startTime = eventTime.start_time || ''

    const dateObj = new Date(startTime)
    const date = dateObj.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
    const time = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true
    })

    // Find existing row by email and update
    const values = sheet.getDataRange().getValues()
    let found = false

    for (let i = 1; i < values.length; i++) {
      if (values[i][2] === email) {
        sheet.getRange(i + 1, 8).setValue(date)
        sheet.getRange(i + 1, 9).setValue(time)
        found = true
        break
      }
    }

    // If email not found — add new row (direct Calendly booking)
    if (!found) {
      sheet.appendRow([
        new Date(),
        name,
        email,
        '',
        '',
        'CALENDLY-DIRECT',
        'BOOKED',
        date,
        time
      ])
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ignored' }))
    .setMimeType(ContentService.MimeType.JSON)
}
