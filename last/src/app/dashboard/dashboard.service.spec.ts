import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let ApiMock: any;

  beforeEach(() => {
    ApiMock = jasmine.createSpyObj('ApiService', [
      'get',
      'delete',
      'patch',
      'post',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: ApiMock }],
    });
    service = TestBed.inject(DashboardService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getGroupsOptions', () => {

    const mockData = {
      results: [{
        characters: ['wot1'],
        planets: ['wot2'],
        title: 'wot3',
        url: 'wot4',
      }],
    };

    it('should exist', () => {
      expect(service.getGroupsOptions).toBeTruthy();
    });

    it('should return api.get with the correct url', () => {
      const mockUrl = 'https://swapi.dev/api/films/';
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getGroupsOptions().subscribe();
      expect(getspy).toHaveBeenCalledOnceWith(mockUrl);

    });

    it('should call the fixGroupData function', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixGroupData').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getGroupsOptions().subscribe();
      expect(spy).toHaveBeenCalledOnceWith(mockData.results);
      spy.calls.reset();
    });

    it('should return  fixed GroupData [Integration Test]', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixGroupData').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getGroupsOptions().subscribe((resp) => {
        expect(resp).toEqual([{ label: 'wot3', url: 'wot4' }]);
      });
      expect(spy).toHaveBeenCalledOnceWith(mockData.results);
      spy.calls.reset();
    });

  })



  describe('getMeasurmentData', () => {

    const mockData = {
      planets: ['wot11/1/'],
    };

    it('should exist', () => {
      expect(service.getMeasurmentData).toBeTruthy();
    });

    it('should return api.get with the correct url', () => {
      const mockUrl = 'https://swapi.dev/api/films/';
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getMeasurmentData(mockUrl).subscribe();
      expect(getspy).toHaveBeenCalledOnceWith(mockUrl);

    });

    it('should call the fixMeasurmentData function', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixMeasurmentData').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getMeasurmentData(mockUrl).subscribe();
      expect(spy).toHaveBeenCalledOnceWith(mockData.planets);
      spy.calls.reset();
    });

    it('should return  fixed measurement [Integration Test]', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixMeasurmentData').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getMeasurmentData(mockUrl).subscribe((resp) => {
        expect(resp).toEqual([{ label: 'planet 1', url: 'wot11/1/' }]);
      });
      expect(spy).toHaveBeenCalledOnceWith(mockData.planets);
      spy.calls.reset();
    });

  })



  describe('getDashboardData', () => {

    const mockData = {
      name: 'test',
      url: 'test',
      residents: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/",
      ],
      height: 1,
      mass: 2,
      films: ['3'],
    };

    it('should exist', () => {
      expect(service.getDashboardData).toBeTruthy();
    });

    it('should return api.get with the correct url', () => {
      const mockUrl = 'test2';
      const emptyData = {
        name: 'test',
        url: 'test',
        residents: []
      };
      let getspy = ApiMock.get.and.returnValue(of(emptyData));
      getspy.calls.reset();

      service.getDashboardData('test1', 'test2').subscribe();
      expect(getspy).toHaveBeenCalledOnceWith(mockUrl);

    });

    it('should call the createDashboardDataRequest function', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'createDashboardDataRequest').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();



      service.getDashboardData('test1', 'test2').subscribe();
      expect(spy).toHaveBeenCalledOnceWith(mockData);
      spy.calls.reset();
    });

    it('should call the fixDashboardData function', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixDashboardData').and.callThrough();
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getDashboardData('test1', 'test2').subscribe();
      expect(spy).toHaveBeenCalled();
      spy.calls.reset();
    });

    it('should call the fixDashboardData function with correct args [Integration Test]', () => {
      const mockUrl = 'test2';

      const spy = spyOn(service, 'fixDashboardData')
      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getDashboardData('test1', 'test2').subscribe();
      expect(spy).toHaveBeenCalledOnceWith([mockData, mockData, mockData, mockData, mockData]);
      spy.calls.reset();
    });

    it('should return api.get with the correct urls after it has called through fixDashboardData [Integration Test]', () => {
      const mockUrl = 'test2';

      const expectedEndpoints = [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/",
      ]

      let getspy = ApiMock.get.and.returnValue(of(mockData));
      getspy.calls.reset();

      service.getDashboardData('test1', 'test2').subscribe();
      expect(getspy).toHaveBeenCalledWith(mockUrl);

      expectedEndpoints.forEach((url) => {
        expect(getspy).toHaveBeenCalledWith(url);
      })
    });
  })

  describe('fixMeasurmentData', () => {
    it('should exist', () => {
      expect(service.fixMeasurmentData).toBeTruthy();
    });

    it('should fix planet data corectly', () => {

      const planets = [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/test/",
        "https://swapi.dev/api/films/14/",
        "wot",
      ];

      const expectedOutput = [
        { label: 'planet 1', url: "https://swapi.dev/api/films/1/" },
        { label: 'planet 3', url: "https://swapi.dev/api/films/3/" },
        { label: 'planet test', url: "https://swapi.dev/api/films/test/" },
        { label: 'planet 14', url: "https://swapi.dev/api/films/14/" },
        { label: 'planet wo', url: "wot" },
      ]
      expect(service.fixMeasurmentData(planets)).toEqual(expectedOutput);
    });

  })

  describe('fixGroupData', () => {
    it('should exist', () => {
      expect(service.fixGroupData).toBeTruthy();
    });

    it('should fix group data corectly', () => {

      const planets = [{
        characters: ['string3'],
        planets: ['string0'],
        title: 'string1',
        url: 'string2',
      }];

      const expectedOutput = [
        { label: 'string1', url: "string2" },
      ]
      expect(service.fixGroupData(planets)).toEqual(expectedOutput);
    });

  })

  describe('createDashboardDataRequest', () => {
    it('should exist', () => {
      expect(service.createDashboardDataRequest).toBeTruthy();
    });

    it('should combine api gets with correct urls', () => {

      const planet = {
        name: 'test',
        url: 'test',
        residents: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/4/",
          "https://swapi.dev/api/films/5/",
          "https://swapi.dev/api/films/6/",
        ],
        height: 1,
        mass: 2,
        films: ['3'],

      };

      const mockResident = {
        height: 1,
        mass: 2,
        films: ['3'],
        url: 'testUrl',
        name: 'peter'
      }

      const expectedCallUrls = [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/",
      ];

      let getspy = ApiMock.get.and.returnValue(of(mockResident));
      service.createDashboardDataRequest(planet).subscribe(resp => {
        expect(resp).toEqual([mockResident, mockResident, mockResident, mockResident, mockResident])
      })

      expectedCallUrls.forEach((url) => {
        expect(getspy).toHaveBeenCalledWith(url);
      })
    });

  })

  describe('fixDashboardData', () => {
    it('should exist', () => {
      expect(service.fixDashboardData).toBeTruthy();
    });

    it('should set today ', () => {

      const mockResidents = [
        {
          height: 165,
          mass: 75,
          films: ['3'],
          url: 'testUrl',
          name: 'peter'
        }
      ];

      const expectedOutput = [
        {
          today: 165 / 250, name: 'peter',
          mtd: 75 / 150, ytd: 1 / 6, todayClass: '', mtdClass: '', ytdClass: 'text--error'
        }
      ];

      expect(service.fixDashboardData(mockResidents)[0].today).toEqual(expectedOutput[0].today);
    });

    it('should set mtd ', () => {

      const mockResidents = [
        {
          height: 165,
          mass: 75,
          films: ['3'],
          url: 'testUrl',
          name: 'peter'
        }
      ];

      const expectedOutput = [
        {
          today: 165 / 250, name: 'peter',
          mtd: 75 / 150, ytd: 1 / 6, todayClass: '', mtdClass: '', ytdClass: 'text--error'
        }
      ];

      expect(service.fixDashboardData(mockResidents)[0].mtd).toEqual(expectedOutput[0].mtd);
    });

    it('should set ytd ', () => {

      const mockResidents = [
        {
          height: 165,
          mass: 75,
          films: ['3'],
          url: 'testUrl',
          name: 'peter'
        }
      ];

      const expectedOutput = [
        {
          today: 165 / 250, name: 'peter',
          mtd: 75 / 150, ytd: 1 / 6, todayClass: '', mtdClass: '', ytdClass: 'text--error'
        }
      ];

      expect(service.fixDashboardData(mockResidents)[0].ytd).toEqual(expectedOutput[0].ytd);
    });

    it('should call the getTextClass with correct values ', () => {

      const mockResidents = [
        {
          height: 165,
          mass: 75,
          films: ['3'],
          url: 'testUrl',
          name: 'peter',
        }
      ];

      const expectedcallArguments = [
        165 / 250, 75 / 150, 1 / 6
      ];

      const spy = spyOn(service, 'getTextClass');
      service.fixDashboardData(mockResidents);
      expectedcallArguments.forEach((arg) => {
        expect(spy).toHaveBeenCalledWith(arg);
      })
    });


    it('should fix dashboard data corectly [Integration Test]', () => {

      const mockResidents = [
        {
          height: 165,
          mass: 75,
          films: ['3'],
          url: 'testUrl',
          name: 'peter'
        },
        {
          height: 210,
          mass: 74,
          films: ['3'],
          url: 'testUrl',
          name: 'peter'
        }
      ];

      const expectedOutput = [
        {
          today: 165 / 250, name: 'peter',
          mtd: 75 / 150, ytd: 1 / 6, todayClass: '', mtdClass: '', ytdClass: 'text--error'
        },
        {
          today: 210 / 250, name: 'peter',
          mtd: 74 / 150, ytd: 1 / 6, todayClass: 'text--success', mtdClass: 'text--warning', ytdClass: 'text--error'
        }
      ];

      expect(service.fixDashboardData(mockResidents)).toEqual(expectedOutput);
    });

  })

  describe('getTextClass', () => {
    it('should exist', () => {
      expect(service.getTextClass).toBeTruthy();
    });

    it('should fix group data corectly', () => {

      const inputs = [0.2999, 0.3, 0.4999, 0.5, 0.6, 0.7, 0.701];

      const expectedOutput = ['text--error', 'text--warning', 'text--warning', '', '', '', 'text--success'];
      inputs.forEach((input, i) => {
        expect(service.getTextClass(input)).toEqual(expectedOutput[i]);

      })
    });

  })

});
