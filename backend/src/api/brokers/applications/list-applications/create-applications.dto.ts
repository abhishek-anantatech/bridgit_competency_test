import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApplicationStatus } from 'src/enums/application-status.enum';

export class CreateApplicationDto {
  @ApiProperty({ description: 'The annual income before tax in dollars' })
  @IsNumber()
  @Min(0)
  annualIncomeBeforeTax: number;

  @ApiProperty({ description: 'The deposit paid on the incoming property in dollars' })
  @IsNumber()
  @Min(0)
  incomingDeposit: number;

  @ApiProperty({ description: 'The purchase price of the incoming property in dollars' })
  @IsNumber()
  @Min(0)
  incomingPrice: number;

  @ApiProperty({ description: 'The stamp duty to be paid on the incoming property in dollars' })
  @IsNumber()
  @Min(0)
  incomingStampDuty: number;

  @ApiProperty({ description: 'The loan amount in dollars' })
  @IsNumber()
  @Min(0)
  loanAmount: number;

  @ApiProperty({ description: 'The duration of the loan in months' })
  @IsInt()
  @Min(1)
  loanDuration: number;

  @ApiProperty({ description: 'The applicant\'s monthly expenses in dollars' })
  @IsNumber()
  @Min(0)
  monthlyExpenses: number;

  @ApiProperty({ description: 'The remaining mortgage if any on the outgoing property in dollars' })
  @IsNumber()
  @Min(0)
  outgoingMortgage: number;

  @ApiProperty({ description: 'The outgoing property valuation in dollars' })
  @IsNumber()
  @Min(0)
  outgoingValuation: number;

  @ApiProperty({ description: 'The applicant\'s savings put towards the loan in dollars' })
  @IsNumber()
  @Min(0)
  savingsContribution: number;

  @ApiProperty({ description: 'The status of the application', enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty({ description: 'The broker ID that arranged the loan' })
  @IsInt()
  brokerId: number;
}
