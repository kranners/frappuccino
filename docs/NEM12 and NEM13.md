---
tags: nem12, nem13, energy, meter data, transformable, programming
---

NEM12 and NEM13 are specifications for standardised [[Meter]] read data.

[See here for the full specification](https://aemo.com.au/-/media/files/electricity/nem/retail_and_metering/market_settlement_and_transfer_solutions/2022/mdff-specification-nem12-nem13-v25.pdf?la=en).

NEM12 records [[Interval Metering Data]], whereas NEM13 records [[Accumulated Metering Data]].

# General

For a file to be valid, it must:
1. Be in CSV format.
2. Contain one Header (100) record.
3. Contain one End (900) record.
4. Contain EITHER NEM12 or NEM13 data, but not both.
5. Files may be delivered either raw, or as `.zip` compressed files.
6. Will always use CRLF lines.

## MSATS
Some parts will specify to match [[MSATS]] (Market Settlement and Transfer Solutions), which are procedures by AEMO to govern responsibility of energy flows between market participants.

# File naming convention

**Note** that for all files, case does not matter. Files also do not necessarily need to end with `.csv`.
The standard file name is `VersionHeader#Unique ID#From#To.csv`

So for the filename `nem12#0123456789012345#mda1#retail1.csv`:
1. `nem12` is the version header and MUST match the version header in the file itself.
2. `0123456789012345` is a unique identifier of this meter read.
3. `mda1` is the Participant ID of the MDP (*Metering Data Provider*) that generated this file.
4. `retail1` is the Participant ID of the MDP to receive this file.

# Specific types

**Datetime**
Is given either in `YYYYMMDD` (8), `YYYYMMDDhhmm` (12) or `YYYYMMDDhhmmss` (14) formats.

**QualityMethod**
Either 'A', 'V' or a string (3). Made up of a quality flag, then a method flag

# Records

All records begin with a `RecordIndicator`, 100-900. The specific one that they need is listed in brackets next to the record name. These won't be specified further, since they all contain one.

String types listed as `String (N)` are VARCHAR of length N.
Strings listed as `String (N!)` are CHAR of length N

**Header (100)**
- A version, either `NEM12` or `NEM13`.
- File creation time. Datetime (12).
- Participant ID From
- Participant ID To

**End (900)**
Contains nothing, only the code `900`.

## NEM12

**NMI details (200)**
- NMI string (10!)
- All NMI suffixes, string (240)
- Interval register ID string (10). Not required
- NMI suffix, string (2!)
- Data stream ID, string (2!). Not required
- Meter number, string (12). Not required
- Unit of measure i.e. `kWh`. String (5)
- Interval in minutes, 2 digit number. One of 5, 15, or 30
- Next scheduled date. Datetime (8)

**Interval data (300)**
- Datetime (8)
- A list of floats, delimited by commas for the interval metering data
  No negatives, no exponentials, may contain decimals
- QualityMethod
- A 3 long number code, not required if the quality flag is 'A' or 'E'. Must not be present if 'V'.
- Description, a string (240). Mandatory if the previous code is `0`.
- The latest Datetime (14) for any updated values or methods.
- MSATS load Datetime (14).

**Interval event (400)**
This record is required if the quality flag in a 300 record is `V`, or where the quality flag is `A` and the reason codes are one of 79, 89, or 61.

- The first interval number the reason and quality apply to
- The last interval number the reason and quality apply to
- QualityMethod
- ReasonCode, number (3)
- Description, string (240)

**B2B details (500)**
Record is mandatory only for manual meter reads.

- 'Trans code', a single character. Must be 'O' if historical
- String (15) service order associated with meter read
- Datetime (14) of the meter reading
- String (15) total record from the meter at the time, read as a number

## NEM13

**Accumulation meter data (250)**
- NMI, string (10!)
- All NMI suffixes, string (240)
- Register ID, string (10)
- NMI suffix, string (2!)
- MDM ID, string (2!)
- Meter serial number, string (12)
- Direction, either I (import) or E (export)
- Previous register read, string (15) read as a number
- Previous register read Datetime (14)
- Previous QualityMethod
- Previous ReasonCode, number (3)
- Previous reason description string (240)
- Current register read, string (15) read as a number
- Current register read Datetime (14)
- Current QualityMethod
- Current ReasonCode, number (3)
- Current reason description string (240)
- Quantity, non-negative number
- Unit of measure i.e. `kWh`. String (5)
- Next scheduled date. Datetime (8)
- The latest Datetime (14) for any updated values or methods.
- MSATS load Datetime (14).

**B2B details (550)**
- Previous trans code. String (1!)
- Previous retailers service order request, string (15) read as a number.
- Current trans code. String (1!)
- Current retailers service order request, string (15) read as a number.
