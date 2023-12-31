import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'

const statusObj = {
  unapproved: { color: 'error' },
  approved: { color: 'success' }
}

const DashboardTable = ({ rows, columns, isLoading, onClickRow = () => {} }) => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              {columns
                .filter(col => col.dataLabel !== 'isVerified' && col.dataLabel !== 'action')
                .map((column, index) => (
                  <TableCell key={index}>{column.label}</TableCell>
                ))}
              {columns.find(column => column.dataLabel === 'isVerified') ? <TableCell>Status</TableCell> : null}
              {columns.find(column => column.dataLabel === 'action') ? <TableCell>Action</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    <Skeleton animation='wave' height={35} width={column.dataLabel === 'fullName' ? 150 : 80} />
                  </TableCell>
                ))}
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={columns.length}>
                  No data to show
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => onClickRow(row)}
                  hover
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 }, cursor: 'pointer' }}
                >
                  {columns
                    .filter(col => col.dataLabel !== 'isVerified' && col.dataLabel !== 'action')
                    .map((column, index) => (
                      <TableCell key={index}>
                        {column.dataLabel === 'fullName' ? (
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                              {row[column.dataLabel]}
                            </Typography>
                            <Typography variant='caption'>{row['role']}</Typography>
                          </Box>
                        ) : (
                          row[column.dataLabel]
                        )}
                      </TableCell>
                    ))}
                  {columns.find(column => column.dataLabel === 'isVerified') ? (
                    <TableCell>
                      <Chip
                        label={row['isVerified'] ? 'Approved' : 'Unapproved'}
                        color={row['isVerified'] ? statusObj.approved.color : statusObj.unapproved.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
